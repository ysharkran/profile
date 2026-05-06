import { AppShell } from "../components/AppShell";
import { HorizontalCard } from "../components/HorizontalCard";
import { blogPosts, paginatePosts } from "../lib/blog";
import { SmartLink } from "../components/SmartLink";

type BlogArchivePageProps = {
  pageNumber?: number;
};

function getArchiveUrl(pageNumber: number) {
  return pageNumber <= 1 ? "/blog" : `/blog/${pageNumber}`;
}

export function BlogArchivePage({ pageNumber = 1 }: BlogArchivePageProps) {
  const { currentPage, totalPages, pageData } = paginatePosts(blogPosts, pageNumber);
  const [featuredPost, ...remainingPosts] = pageData;

  return (
    <AppShell title="Blog">
      <section className="surface-panel page-heading">
        <div className="section-kicker">Blog</div>
        <h1 className="text-5xl font-bold">Production Notes and Strong Opinions</h1>
        <p className="section-copy max-w-4xl">
          Fewer generic explainers, more notes from the part of engineering work that hurts:
          refactors under roadmap pressure, flaky workflows, debugging ugly incidents, AI review
          loops, and the tradeoffs that decide whether a system stays operable in production.
        </p>
      </section>

      {featuredPost && (
        <section className="surface-panel p-7 md:p-8">
          <div className="section-kicker">Featured article</div>
          <div className="mt-6">
            <HorizontalCard
              title={featuredPost.title}
              description={featuredPost.description}
              image={featuredPost.heroImage}
              url={`/blog/${featuredPost.slug}`}
              target="_self"
              badge={featuredPost.badge}
              tags={featuredPost.tags}
              pubDate={featuredPost.pubDate}
              featured={true}
            />
          </div>
        </section>
      )}

      <section className="surface-panel p-7 md:p-8">
        <div className="section-kicker">Recent posts</div>
        <div className="listing-grid mt-6">
          {remainingPosts.map((post) => (
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
          <SmartLink to={getArchiveUrl(currentPage - 1)} className="btn btn-ghost border border-base-300/80 px-5">
            <svg className="h-6 w-6 fill-current md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
            </svg>
            Recent posts
          </SmartLink>
        ) : (
          <div />
        )}
        {currentPage < totalPages ? (
          <SmartLink to={getArchiveUrl(currentPage + 1)} className="btn btn-ghost border border-base-300/80 px-5">
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
