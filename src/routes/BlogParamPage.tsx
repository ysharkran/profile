import { useParams } from "react-router-dom";
import { BlogArchivePage } from "./BlogArchivePage";
import { BlogPostPage } from "./BlogPostPage";

export function BlogParamPage() {
  const params = useParams();
  const blogParam = params.blogParam;

  if (blogParam && /^\d+$/u.test(blogParam)) {
    return <BlogArchivePage pageNumber={Number(blogParam)} />;
  }

  return <BlogPostPage slug={blogParam} />;
}
