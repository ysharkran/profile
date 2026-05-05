import { AppShell } from "../components/AppShell";
import { ProjectShowcaseCard } from "../components/ProjectShowcaseCard";
import { projectSections } from "../data/portfolio";

export function ProjectsPage() {
  return (
    <AppShell title="Projects">
      <section className="surface-panel page-heading">
        <div className="section-kicker">Portfolio</div>
        <h1 className="text-5xl font-bold">Project Portfolio</h1>
        <p className="section-copy max-w-4xl">
          The cards below point to public repos behind product-style web apps, AI products, and
          cross-platform experiences, plus more domain-specific applications across commerce, DeFi,
          insurance, and automotive workflows. If you fork one, you can later replace the repo path
          in one place and point the card at your own GitHub version instead.
        </p>
      </section>

      {projectSections.map((section) => (
        <section key={section.title} className="surface-panel p-7 md:p-8">
          <div className="section-kicker">{section.title}</div>
          <div className="mt-4">
            <h2 className="text-4xl font-bold">{section.title}</h2>
            <p className="section-copy mt-3 max-w-4xl">{section.description}</p>
          </div>

          <div className="project-grid mt-7">
            {section.items.map((project) => (
              <ProjectShowcaseCard key={project.title} {...project} />
            ))}
          </div>
        </section>
      ))}
    </AppShell>
  );
}
