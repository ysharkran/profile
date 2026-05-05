import { Link } from "react-router-dom";
import { SmartLink } from "./SmartLink";

type HorizontalCardProps = {
  title: string;
  image?: string;
  description: string;
  url: string;
  badge?: string;
  tags?: string[];
  pubDate?: Date;
  target?: string;
  featured?: boolean;
};

export function HorizontalCard({
  title,
  image,
  description,
  url,
  badge,
  tags = [],
  pubDate,
  target = "_self",
  featured = false,
}: HorizontalCardProps) {
  const dateLabel = pubDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(pubDate)
    : null;

  return (
    <article className="surface-panel overflow-hidden rounded-[1.8rem] transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
      <div className={featured ? "grid gap-0 lg:grid-cols-[minmax(23rem,29rem)_1fr]" : "grid gap-0 md:grid-cols-[minmax(18rem,22rem)_1fr]"}>
        {image && (
          <SmartLink
            to={url}
            target={target}
            className={featured ? "overflow-hidden border-b border-base-300/70 lg:border-b-0 lg:border-r" : "overflow-hidden border-b border-base-300/70 md:border-b-0 md:border-r"}
          >
            <img
              src={image}
              alt={title}
              width="1280"
              height="800"
              loading="eager"
              decoding="async"
              className="aspect-[16/10] h-full w-full object-cover object-left-top transition duration-300 hover:scale-[1.02]"
            />
          </SmartLink>
        )}
        <div className={featured ? "flex h-full flex-col p-5 md:p-6 lg:p-8" : "flex h-full flex-col p-5 md:p-6"}>
          <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/58">
            {dateLabel && <span>{dateLabel}</span>}
            {badge && <span className="badge badge-secondary border-0 px-3 py-3 font-semibold">{badge}</span>}
          </div>
          <SmartLink
            to={url}
            target={target}
            className={featured ? "mt-3 text-[2rem] font-bold leading-tight transition hover:text-primary md:text-[2.35rem]" : "mt-3 text-[1.55rem] font-bold leading-tight transition hover:text-primary md:text-[1.8rem]"}
          >
            {title}
          </SmartLink>
          <p className={featured ? "mt-4 max-w-3xl text-[1.06rem] leading-8 text-base-content/74" : "mt-4 text-[1rem] leading-8 text-base-content/74"}>
            {description}
          </p>
          {tags.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {tags.slice(0, featured ? 5 : 4).map((tag) => (
                <Link
                  key={tag}
                  to={`/blog/tag/${tag}`}
                  className="rounded-full border border-base-300/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-base-content/66 transition hover:border-primary/35 hover:text-primary"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
          <div className="mt-5">
            <SmartLink
              to={url}
              target={target}
              className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/80 transition hover:text-primary"
            >
              Read article
            </SmartLink>
          </div>
        </div>
      </div>
    </article>
  );
}
