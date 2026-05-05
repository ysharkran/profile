import { useEffect } from "react";
import { SITE_DESCRIPTION, SITE_TITLE } from "../config";

export function useDocumentMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_TITLE.split(" | ")[0]}` : SITE_TITLE;

    const metaDescription =
      document.querySelector('meta[name="description"]') ??
      (() => {
        const meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
        return meta;
      })();

    metaDescription.setAttribute("content", description ?? SITE_DESCRIPTION);
  }, [description, title]);
}
