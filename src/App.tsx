import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { BlogArchivePage } from "./routes/BlogArchivePage";
import { BlogParamPage } from "./routes/BlogParamPage";
import { BlogTagPage } from "./routes/BlogTagPage";
import { HomePage } from "./routes/HomePage";
import { NotFoundPage } from "./routes/NotFoundPage";
import { ProjectsPage } from "./routes/ProjectsPage";
import { ResumePage } from "./routes/ResumePage";
import { ServicesPage } from "./routes/ServicesPage";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/cv" element={<ResumePage />} />
        <Route path="/blog" element={<BlogArchivePage />} />
        <Route path="/blog/:blogParam" element={<BlogParamPage />} />
        <Route path="/blog/tag/:tag" element={<BlogTagPage />} />
        <Route path="/blog/tag/:tag/:pageNumber" element={<BlogTagPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}
