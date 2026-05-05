import { SmartLink } from "./SmartLink";

type ProjectShowcaseCardProps = {
  title: string;
  description: string;
  image?: string;
  url: string;
  badge?: string;
  repoLabel?: string;
  target?: string;
};

export function ProjectShowcaseCard({
  title,
  description,
  image,
  url,
  badge,
  repoLabel,
  target = "_blank",
}: ProjectShowcaseCardProps) {
  return (
    <SmartLink
      to={url}
      target={target}
      className="group surface-panel flex h-full flex-col overflow-hidden rounded-[1.8rem] transition duration-200 hover:-translate-y-1 hover:shadow-2xl"
    >
      {image && (
        <div className="overflow-hidden border-b border-base-300/70">
          <img
            src={image}
            alt={title}
            width="1280"
            height="800"
            loading="eager"
            decoding="async"
            className="aspect-[16/10] w-full object-cover object-left-top transition duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex h-full flex-col p-5 md:p-6">
        {repoLabel && (
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-base-content/46">
            {repoLabel}
          </div>
        )}
        <div className="flex items-start justify-between gap-3">
          <h3 className={`${repoLabel ? "mt-3" : ""} text-[1.65rem] font-bold leading-tight transition group-hover:text-primary`}>
            {title}
          </h3>
          {badge && <span className="badge badge-secondary border-0 px-3 py-3 font-semibold">{badge}</span>}
        </div>
        <p className="mt-4 text-[0.98rem] leading-7 text-base-content/74">{description}</p>
        <div className="mt-auto pt-6 text-sm font-semibold uppercase tracking-[0.16em] text-primary/80">
          Open upstream repo
        </div>
      </div>
    </SmartLink>
  );
}
