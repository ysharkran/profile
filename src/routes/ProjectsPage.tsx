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
          The links below now point to best-match public reference repositories and their real GitHub
          preview images. Once you publish your own repos, these can be swapped out cleanly.
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
