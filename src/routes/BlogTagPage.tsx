import { useParams } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { HorizontalCard } from "../components/HorizontalCard";
import { SmartLink } from "../components/SmartLink";
import { getPostsByTag, paginatePosts } from "../lib/blog";
import { NotFoundPage } from "./NotFoundPage";

function getTagArchiveUrl(tag: string, pageNumber: number) {
  return pageNumber <= 1 ? `/blog/tag/${tag}` : `/blog/tag/${tag}/${pageNumber}`;
}

export function BlogTagPage() {
  const params = useParams();
  const tag = params.tag;
  const requestedPage = Number(params.pageNumber ?? "1");
  const taggedPosts = tag ? getPostsByTag(tag) : [];

  if (!tag || taggedPosts.length === 0) {
    return <NotFoundPage />;
  }

  const { currentPage, totalPages, pageData } = paginatePosts(taggedPosts, requestedPage);

  return (
    <AppShell title={`Blog - ${tag}`}>
      <section className="surface-panel page-heading">
        <div className="section-kicker">Tag archive</div>
        <h1 className="text-5xl font-bold">Posts tagged {tag}</h1>
        <p className="section-copy max-w-4xl">
          A focused list of articles related to {tag}, shown in the same larger archive view as the main
          blog.
        </p>
      </section>

      <section className="surface-panel p-7 md:p-8">
        <div className="section-kicker">Matching posts</div>
        <div className="listing-grid mt-6">
          {pageData.map((post) => (
            <HorizontalCard
              key={post.slug}
              title={post.title}
              description={post.description}
              image={post.heroImage}
              url={`/blog/${post.slug}`}
              target="_self"
              badge={post.badge}
              tags={post.tags}
              pubDate={post.pubDate}
            />
          ))}
        </div>
      </section>

      <div className="flex justify-between">
        {currentPage > 1 ? (
          <SmartLink to={getTagArchiveUrl(tag, currentPage - 1)} className="btn btn-ghost border border-base-300/80 px-5">
            <svg className="h-6 w-6 fill-current md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
            </svg>
            Recent posts
          </SmartLink>
        ) : (
          <div />
        )}
        {currentPage < totalPages ? (
          <SmartLink to={getTagArchiveUrl(tag, currentPage + 1)} className="btn btn-ghost border border-base-300/80 px-5">
            Older posts
            <svg className="h-6 w-6 fill-current md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </SmartLink>
        ) : (
          <div />
        )}
      </div>
    </AppShell>
  );
}
