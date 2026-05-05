import { AppShell } from "../components/AppShell";
import { ArticlePreviewCard } from "../components/ArticlePreviewCard";
import { ProjectShowcaseCard } from "../components/ProjectShowcaseCard";
import { blogPosts } from "../lib/blog";
import { featuredProjects, focusAreas, heroStats, profile } from "../data/portfolio";

export function HomePage() {
  const latestPosts = blogPosts.slice(0, 4);

  return (
    <AppShell>
      <section className="surface-panel overflow-hidden p-7 md:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="section-kicker">Independent product engineering</div>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="eyebrow-pill">{profile.location}</span>
              <span className="eyebrow-pill">Remote worldwide</span>
            </div>
            <h1 className="section-title mt-5">{profile.name}</h1>
            <div className="mt-4 max-w-4xl text-2xl font-semibold leading-tight text-base-content/92">
              {profile.role}
            </div>
            <div className="mt-5 max-w-4xl text-[1.24rem] leading-9 text-base-content/82">
              {profile.headline}
            </div>
            <div className="section-copy mt-5 max-w-4xl">
              {profile.summary} {profile.availability}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a className="btn btn-primary border-0 px-6" href={`mailto:${profile.email}`}>
                Start a conversation
              </a>
              <a href="/projects" className="btn btn-outline px-6">
                See selected work
              </a>
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-ghost border border-base-300/80 px-6">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-base-300/70 bg-base-100/72 p-6 shadow-lg shadow-base-content/5">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-base-content/46">
              Current focus
            </div>
            <div className="mt-4 grid gap-3">
              {focusAreas.map((item) => (
                <div key={item} className="rounded-2xl border border-base-300/70 bg-base-100/80 px-4 py-4 text-sm leading-7 text-base-content/76">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 info-grid md:grid-cols-3">
          {heroStats.map((item) => (
            <div key={item.label} className="metric-card">
              <div className="metric-value">{item.value}</div>
              <div className="metric-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-panel p-7 md:p-8">
        <div className="page-heading p-0">
          <div className="section-kicker">Selected work</div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-bold">Featured Projects</h2>
              <p className="section-copy mt-3 max-w-3xl">
                Public repos that feel closer to real company work: SaaS-style web apps, AI-facing
                products, and cross-platform applications that can be forked and reshaped into your
                own portfolio direction.
              </p>
            </div>
            <a href="/projects" className="btn btn-ghost border border-base-300/80 px-5">
              Open full portfolio
            </a>
          </div>
        </div>

        <div className="project-grid mt-6">
          {featuredProjects.map((project) => (
            <ProjectShowcaseCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      <section className="surface-panel p-7 md:p-8">
        <div className="page-heading p-0">
          <div className="section-kicker">Writing</div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-bold">Latest Engineering Notes</h2>
              <p className="section-copy mt-3 max-w-3xl">
                Longer-form writing on software delivery, AI systems, architecture, debugging, and the
                practical side of building dependable products.
              </p>
            </div>
            <a href="/blog" className="btn btn-ghost border border-base-300/80 px-5">
              Browse all posts
            </a>
          </div>
        </div>

        <div className="article-grid mt-6">
          {latestPosts.map((post, index) => (
            <ArticlePreviewCard
              key={post.slug}
              title={post.title}
              description={post.description}
              image={post.heroImage}
              url={`/blog/${post.slug}`}
              target="_self"
              badge={post.badge}
              tags={post.tags}
              pubDate={post.pubDate}
              featured={index === 0}
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
