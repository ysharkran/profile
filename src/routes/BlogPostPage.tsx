import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, useParams } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { getPostBySlug } from "../lib/blog";
import { NotFoundPage } from "./NotFoundPage";

type BlogPostPageProps = {
  slug?: string;
};

export function BlogPostPage({ slug: explicitSlug }: BlogPostPageProps) {
  const params = useParams();
  const slug = explicitSlug ?? params.slug ?? params.blogParam;

  if (!slug) {
    return <NotFoundPage />;
  }

  const post = getPostBySlug(slug);

  if (!post) {
    return <NotFoundPage />;
  }

  const displayDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(post.pubDate);

  return (
    <AppShell title={post.title} description={post.description}>
      <main className="md:flex md:justify-center">
        <article className="prose prose-lg max-w-[750px] prose-headings:text-base-content prose-p:text-base-content/85 prose-li:text-base-content/85 prose-strong:text-base-content prose-code:text-primary prose-a:text-primary prose-blockquote:border-primary">
          {post.heroImage && (
            <img
              src={post.heroImage}
              alt={post.title}
              width="1600"
              height="900"
              decoding="async"
              className="mb-6 w-full rounded-2xl border border-base-300 object-cover object-left-top"
            />
          )}
          <h1 className="title my-2 text-4xl font-bold">{post.title}</h1>
          <time>{displayDate}</time>
          <br />
          {post.badge && <div className="badge badge-secondary my-1">{post.badge}</div>}
          {post.tags.map((tag) => (
            <Link key={tag} to={`/blog/tag/${tag}`} className="badge badge-outline ml-2 no-underline">
              {tag}
            </Link>
          ))}
          {post.updatedDate && (
            <div>
              Last updated on <time>{post.updatedDate}</time>
            </div>
          )}
          <div className="divider my-2"></div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children, ...props }) => {
                const isInternal = typeof href === "string" && href.startsWith("/");

                if (isInternal) {
                  return (
                    <Link to={href} {...props}>
                      {children}
                    </Link>
                  );
                }

                return (
                  <a href={href} target="_blank" rel="noreferrer" {...props}>
                    {children}
                  </a>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </main>
    </AppShell>
  );
}
