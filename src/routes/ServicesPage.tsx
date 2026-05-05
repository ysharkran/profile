import { AppShell } from "../components/AppShell";
import { ProjectShowcaseCard } from "../components/ProjectShowcaseCard";
import { expertise } from "../data/portfolio";

export function ServicesPage() {
  return (
    <AppShell title="Expertise">
      <section className="surface-panel page-heading">
        <div className="section-kicker">Capabilities</div>
        <h1 className="text-5xl font-bold">Core Expertise</h1>
        <p className="section-copy max-w-4xl">
          The work areas that show up repeatedly across the resume, the project portfolio, and the kinds
          of systems this site is designed to represent well.
        </p>
      </section>

      <section className="surface-panel p-7 md:p-8">
        <div className="project-grid">
          {expertise.map((item) => (
            <ProjectShowcaseCard key={item.title} {...item} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
