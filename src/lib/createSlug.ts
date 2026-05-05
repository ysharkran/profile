import { GENERATE_SLUG_FROM_TITLE } from "../config";

export default function (title: string, staticSlug: string) {
  if (!GENERATE_SLUG_FROM_TITLE) {
    return staticSlug;
  }

  return title
    // remove leading & trailing whitespace
      .trim()
    // output lowercase
    .toLowerCase()
    // replace spaces
    .replace(/\s+/g, "-")
    // remove special characters
    .replace(/[^\w-]/g, "")
    // remove leading & trailing separators
    .replace(/^-+|-+$/g, "");
}
