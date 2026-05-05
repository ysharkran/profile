import type { PropsWithChildren } from "react";

type TimelineProps = PropsWithChildren<{
  title: string;
  subtitle: string;
  summary?: string;
  badges?: string[];
}>;

export function Timeline({ title, subtitle, summary, badges = [], children }: TimelineProps) {
  return (
    <div className="resume-timeline-item">
      <div className="resume-timeline-rail" aria-hidden="true">
        <span className="resume-timeline-dot"></span>
        <span className="resume-timeline-line"></span>
      </div>
      <article className="resume-timeline-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-base-content/48">
              {subtitle}
            </div>
            <h3 className="mt-3 text-[1.45rem] font-bold leading-tight">{title}</h3>
            {summary && <p className="mt-3 text-[0.98rem] leading-7 text-base-content/74">{summary}</p>}
          </div>

          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span key={badge} className="resume-context-badge">
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {children && <div className="mt-5">{children}</div>}
      </article>
    </div>
  );
}
