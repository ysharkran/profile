import { type PropsWithChildren, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SITE_DESCRIPTION, SITE_TITLE } from "../config";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { Footer } from "./Footer";
import { InteractiveBackground } from "./InteractiveBackground";
import { MobileHeader } from "./MobileHeader";
import { Sidebar } from "./Sidebar";

type AppShellProps = PropsWithChildren<{
  title?: string;
  description?: string;
  includeSidebar?: boolean;
}>;

function getActiveItemId(pathname: string) {
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/services")) return "services";
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/cv")) return "cv";
  return "home";
}

export function AppShell({
  children,
  title,
  description = SITE_DESCRIPTION,
  includeSidebar = true,
}: AppShellProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useDocumentMeta(title, description);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const pageTitle = title ? `${title} | ${SITE_TITLE.split(" | ")[0]}` : SITE_TITLE;

  return (
    <div className="portfolio-shell">
      <InteractiveBackground />
      {includeSidebar && <MobileHeader onMenuOpen={() => setSidebarOpen(true)} />}
      <div className="relative lg:flex">
        {includeSidebar && (
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            activeItemId={getActiveItemId(location.pathname)}
          />
        )}
        <div className="portfolio-content-shell min-h-screen flex-1">
          <div className="sr-only">{pageTitle}</div>
          <div className="md:flex md:justify-center">
            <main className="portfolio-main portfolio-stack max-w-[100vw]">{children}</main>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
