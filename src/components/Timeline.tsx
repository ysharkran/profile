import type { PropsWithChildren } from "react";

type TimelineProps = PropsWithChildren<{
  title: string;
  subtitle: string;
}>;

export function Timeline({ title, subtitle, children }: TimelineProps) {
  return (
    <div className="flex">
      <div className="education__time">
        <span className="mt-1 block h-4 w-4 rounded-full bg-primary"></span>
        <span className="education__line block h-full w-[2px] translate-x-[7px] bg-primary"></span>
      </div>
      <div className="experience__data bd-grid px-5">
        <h3 className="mb-1 font-semibold">{title}</h3>
        <span className="text-sm font-light">{subtitle}</span>
        {children && <div className="my-2 text-justify">{children}</div>}
      </div>
    </div>
  );
}
