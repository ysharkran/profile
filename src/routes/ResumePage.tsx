import { AppShell } from "../components/AppShell";
import { Timeline } from "../components/Timeline";
import {
  careerHighlights,
  education,
  experience,
  profile,
  profileQuickFacts,
  resumeFocusAreas,
  resumeSnapshot,
  skillGroups,
  workPrinciples,
} from "../data/portfolio";

export function ResumePage() {
  return (
    <AppShell title="Resume">
      <section className="surface-panel overflow-hidden p-7 md:p-8 lg:p-10">
        <div className="grid gap-8 xl:grid-cols-[1.28fr_0.72fr]">
          <div>
            <div className="section-kicker">Profile</div>
            <h1 className="section-title mt-5">Resume and Career Snapshot</h1>
            <div className="mt-4 max-w-4xl text-2xl font-semibold leading-tight text-base-content/92">
              {profile.role}
            </div>
            <p className="section-copy mt-5 max-w-4xl">
              {profile.summary} {profile.availability}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="eyebrow-pill">{profile.location}</span>
              <span className="eyebrow-pill">Advanced English (C1)</span>
              <span className="eyebrow-pill">Remote worldwide</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a className="btn btn-primary border-0 px-6" href={profile.resumeUrl} target="_blank" rel="noreferrer">
                Download Resume PDF
              </a>
              <a className="btn btn-outline px-6" href={`mailto:${profile.email}`}>
                Email
              </a>
              <a className="btn btn-ghost border border-base-300/80 px-6" href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="resume-spotlight-card rounded-[1.6rem] p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-base-content/46">
              At a glance
            </div>
            <div className="mt-4 grid gap-3">
              {profileQuickFacts.map((item) => (
                <div key={item.label} className="resume-compact-fact rounded-2xl px-4 py-4">
                  <div className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-base-content/45">
                    {item.label}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-base-content/82">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="soft-divider my-5"></div>
            <div className="text-sm leading-7 text-base-content/78">
              Best fit for teams building product-heavy systems where frontend polish, backend
              reliability, and domain complexity all matter at the same time.
            </div>
            <div className="mt-5 grid gap-2">
              <a className="resume-contact-link" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <a className="resume-contact-link" href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}>
                {profile.phone}
              </a>
              <a className="resume-contact-link" href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn profile
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="surface-panel p-7 md:p-8">
        <div className="page-heading p-0">
          <div className="section-kicker">Snapshot</div>
          <div>
            <h2 className="text-4xl font-bold">What I Bring to a Team</h2>
            <p className="section-copy mt-3 max-w-3xl">
              A mix of product engineering execution, backend depth, and applied AI work shaped by
              production systems rather than purely demo environments.
            </p>
          </div>
        </div>

        <div className="resume-snapshot-grid mt-7">
          {resumeSnapshot.map((item) => (
            <div key={item.label} className="metric-card">
              <div className="metric-value">{item.value}</div>
              <div className="metric-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-panel p-7 md:p-8">
        <div className="page-heading p-0">
          <div className="section-kicker">Focus</div>
          <div>
            <h2 className="text-4xl font-bold">Engineering Focus Areas</h2>
            <p className="section-copy mt-3 max-w-4xl">
              The recurring pattern across the resume is not one framework or one role title. It is
              operating across product interfaces, backend systems, and domain-heavy workflows where
              correctness and usability both matter.
            </p>
          </div>
        </div>

        <div className="resume-focus-grid mt-7">
          {resumeFocusAreas.map((item) => (
            <article key={item.title} className="resume-focus-card rounded-[1.45rem] p-5">
              <div className="badge badge-secondary border-0 px-3 py-3 font-semibold">{item.badge}</div>
              <h3 className="mt-4 text-[1.45rem] font-bold leading-tight">{item.title}</h3>
              <p className="mt-3 text-[0.98rem] leading-7 text-base-content/74">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-panel p-7 md:p-8">
        <div className="page-heading p-0">
          <div className="section-kicker">Experience</div>
          <div>
            <h2 className="text-4xl font-bold">Career Timeline</h2>
            <p className="section-copy mt-3 max-w-4xl">
              Progression from full-stack delivery through product and platform work into more
              operationally complex systems spanning finance, AI workflows, and Web3 products.
            </p>
          </div>
        </div>

        <div className="time-line-container mt-8 grid gap-6">
          {experience.map((item) => (
            <Timeline
              key={`${item.company}-${item.period}`}
              title={item.title}
              subtitle={`${item.company} · ${item.period} · ${item.location}`}
              summary={item.summary}
              badges={item.badges}
            >
              <ul className="resume-bullet-list">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </Timeline>
          ))}
        </div>
      </section>

      <div className="resume-lower-grid">
        <section className="surface-panel p-7 md:p-8">
          <div className="section-kicker">Education</div>
          <h2 className="mt-4 text-3xl font-bold">Foundation</h2>

          <div className="mt-7 grid gap-4">
            {education.map((item) => (
              <article key={item.title} className="resume-info-card rounded-[1.4rem] p-5">
                <h3 className="text-[1.25rem] font-bold">{item.title}</h3>
                <div className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-base-content/48">
                  {item.institution}
                </div>
                <div className="mt-3 text-sm leading-7 text-base-content/74">
                  {item.period} · {item.location}
                </div>
                <p className="mt-3 text-sm leading-7 text-base-content/74">{item.notes}</p>
              </article>
            ))}
          </div>

          <div className="soft-divider my-7"></div>

          <div className="section-kicker">Signals</div>
          <h3 className="mt-4 text-2xl font-bold">Additional Highlights</h3>
          <ul className="resume-inline-list mt-5">
            {careerHighlights.map((item) => (
              <li key={item} className="resume-inline-list__item">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="surface-panel p-7 md:p-8">
          <div className="section-kicker">Approach</div>
          <h2 className="mt-4 text-3xl font-bold">How I Tend to Work</h2>
          <div className="mt-7 grid gap-4">
            {workPrinciples.map((item) => (
              <article key={item} className="resume-principle-card rounded-[1.4rem] p-5">
                <p className="text-sm leading-7 text-base-content/78">{item}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="surface-panel p-7 md:p-8">
        <div className="page-heading p-0">
          <div className="section-kicker">Skills</div>
          <div>
            <h2 className="text-4xl font-bold">Technical Coverage</h2>
            <p className="section-copy mt-3 max-w-4xl">
              Enough range to move across the full delivery path, with the strongest depth in
              JavaScript and TypeScript product stacks, Node.js and Python backend work, and AI or
              domain-heavy systems that need operational rigor.
            </p>
          </div>
        </div>

        <div className="resume-skills-grid mt-7">
          {skillGroups.map((group) => (
            <article key={group.title} className="resume-skill-group rounded-[1.45rem] p-5">
              <h3 className="text-[1.18rem] font-bold">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {group.items.map((skill) => (
                  <span key={skill} className="resume-skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
