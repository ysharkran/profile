import { AppShell } from "../components/AppShell";
import { Timeline } from "../components/Timeline";
import { education, experience, highlights, profile, skills } from "../data/portfolio";

export function ResumePage() {
  return (
    <AppShell title="Resume">
      <div className="mb-5">
        <div className="w-full text-3xl font-bold">Profile</div>
      </div>

      <div className="mb-10 text-justify">
        {profile.summary} {profile.availability}
      </div>

      <div className="mb-10 flex flex-wrap gap-4">
        <a className="btn" href={profile.resumeUrl} target="_blank" rel="noreferrer">
          Download Resume PDF
        </a>
        <a className="btn btn-outline" href={`mailto:${profile.email}`}>
          Email
        </a>
        <a className="btn btn-outline" href={profile.linkedinUrl} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>

      <div className="mb-5">
        <div className="w-full text-3xl font-bold">Education</div>
      </div>

      <div className="time-line-container mb-10 grid gap-4">
        {education.map((item) => (
          <Timeline key={item.title} title={item.title} subtitle={item.subtitle} />
        ))}
      </div>

      <div className="mb-5">
        <div className="w-full text-3xl font-bold">Experience</div>
      </div>

      <div className="time-line-container mb-10">
        {experience.map((item) => (
          <Timeline key={item.title} title={item.title} subtitle={item.subtitle}>
            <ul className="mx-6 grid list-disc gap-2">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </Timeline>
        ))}
      </div>

      <div className="mb-5">
        <div className="w-full text-3xl font-bold">Highlights</div>
      </div>

      <ul className="mx-6 mb-10 grid list-disc gap-2">
        {highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="mb-5">
        <div className="w-full text-3xl font-bold">Skills</div>
      </div>

      <ul className="mx-6 columns-2 list-disc md:columns-5">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </AppShell>
  );
}
