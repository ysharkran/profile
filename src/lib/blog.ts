import createSlug from "./createSlug";
import { withBasePath } from "./withBasePath";

export type BlogPost = {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: string;
  heroImage?: string;
  badge?: string;
  tags: string[];
  slug: string;
  content: string;
};

const rawPosts = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function stripWrappingQuotes(value: string) {
  return value.replace(/^['"]|['"]$/gu, "");
}

function parseTags(value: string) {
  const normalized = value.trim();
  if (!normalized.startsWith("[") || !normalized.endsWith("]")) {
    return [];
  }

  return normalized
    .slice(1, -1)
    .split(",")
    .map((item) => stripWrappingQuotes(item.trim()))
    .filter(Boolean);
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/u);
  if (!match) {
    return { data: {} as Record<string, string | string[]>, content: raw };
  }

  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split(/\r?\n/u)) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();

    data[key] = key === "tags" ? parseTags(rawValue) : stripWrappingQuotes(rawValue);
  }

  return {
    data,
    content: raw.slice(match[0].length),
  };
}

function parsePost(filePath: string, raw: string): BlogPost {
  const { data, content } = parseFrontmatter(raw);
  const staticSlug = filePath.split("/").pop()?.replace(/\.md$/u, "") ?? "";

  if (typeof data.title !== "string" || typeof data.description !== "string") {
    throw new Error(`Invalid blog frontmatter in ${filePath}`);
  }

  return {
    title: data.title,
    description: data.description,
    pubDate: new Date(String(data.pubDate)),
    updatedDate: typeof data.updatedDate === "string" ? data.updatedDate : undefined,
    heroImage:
      typeof data.heroImage === "string" ? withBasePath(data.heroImage) : undefined,
    badge: typeof data.badge === "string" ? data.badge : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    slug: createSlug(data.title, staticSlug),
    content,
  };
}

export const blogPosts = Object.entries(rawPosts)
  .map(([filePath, raw]) => parsePost(filePath, raw))
  .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByTag(tag: string) {
  return blogPosts.filter((post) => post.tags.includes(tag));
}

export function getAllTags() {
  return [...new Set(blogPosts.flatMap((post) => post.tags))].sort();
}

export function paginatePosts(posts: BlogPost[], pageNumber: number, pageSize = 10) {
  const currentPage = Number.isFinite(pageNumber) && pageNumber > 0 ? pageNumber : 1;
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;

  return {
    currentPage: safePage,
    totalPages,
    pageData: posts.slice(startIndex, startIndex + pageSize),
  };
}
