import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type SmartLinkProps = PropsWithChildren<
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    to: string;
  }
>;

export function SmartLink({ children, to, target, rel, ...props }: SmartLinkProps) {
  const isInternal = to.startsWith("/");

  if (isInternal && (!target || target === "_self")) {
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={to}
      target={target}
      rel={rel ?? (target === "_blank" ? "noreferrer" : undefined)}
      {...props}
    >
      {children}
    </a>
  );
}
