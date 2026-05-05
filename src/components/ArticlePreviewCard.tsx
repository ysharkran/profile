import { SmartLink } from "./SmartLink";

type ArticlePreviewCardProps = {
  title: string;
  description: string;
  image?: string;
  url: string;
  badge?: string;
  tags?: string[];
  pubDate: Date;
  target?: string;
  featured?: boolean;
};

export function ArticlePreviewCard({
  title,
  description,
  image,
  url,
  badge,
  tags = [],
  pubDate,
  target = "_self",
  featured = false,
}: ArticlePreviewCardProps) {
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(pubDate);

  return (
    <SmartLink
      to={url}
      target={target}
      className={[
        "group surface-panel flex h-full flex-col overflow-hidden rounded-[1.8rem] transition duration-200 hover:-translate-y-1 hover:shadow-2xl",
        featured ? "md:col-span-2 md:grid md:grid-cols-[1.15fr_0.85fr]" : "",
      ].join(" ")}
    >
      {image && (
        <div className={featured ? "overflow-hidden border-b border-base-300/70 md:border-b-0 md:border-r" : "overflow-hidden border-b border-base-300/70"}>
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
        <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/58">
          <span>{dateLabel}</span>
          {badge && <span className="badge badge-secondary border-0 px-3 py-3 font-semibold">{badge}</span>}
        </div>
        <h3 className={featured ? "mt-3 text-[2rem] font-bold leading-tight transition group-hover:text-primary" : "mt-3 text-[1.5rem] font-bold leading-tight transition group-hover:text-primary"}>
          {title}
        </h3>
        <p className="mt-4 text-[0.98rem] leading-7 text-base-content/74">{description}</p>
        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {tags.slice(0, featured ? 5 : 3).map((tag) => (
              <span key={tag} className="rounded-full border border-base-300/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-base-content/66">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </SmartLink>
  );
}
