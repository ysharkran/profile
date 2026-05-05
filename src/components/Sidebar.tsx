import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { profile } from "../data/portfolio";
import { SmartLink } from "./SmartLink";
import { ThemeToggle } from "./ThemeToggle";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  activeItemId: string;
};

const navigationItems = [
  { id: "home", href: "/", label: "Home" },
  { id: "projects", href: "/projects", label: "Projects" },
  { id: "services", href: "/services", label: "Expertise" },
  { id: "blog", href: "/blog", label: "Blog" },
  { id: "cv", href: "/cv", label: "Resume" },
];

export function Sidebar({ open, onClose, activeItemId }: SidebarProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  const hasPersonalGithub =
    profile.githubUrl.length > 0 && !profile.githubUrl.includes("your-github-handle");
  const primaryRole = profile.role.split(" / ")[0];

  return (
    <>
      <button
        type="button"
        className={`fixed inset-0 z-40 bg-neutral/45 transition-opacity lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
        aria-label="Close navigation"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[21rem] max-w-[88vw] flex-col bg-transparent px-4 py-4 transition-transform duration-300 lg:sticky lg:top-0 lg:left-auto lg:inset-y-auto lg:z-40 lg:h-screen lg:max-w-none lg:flex-none lg:self-start ${open ? "translate-x-0" : "-translate-x-[110%] lg:translate-x-0"}`}
      >
        <div className="sidebar-panel flex h-full min-h-0 flex-col overflow-hidden rounded-[2rem] p-4">
          <div className="sidebar-scroll flex min-h-0 flex-1 flex-col overflow-y-auto pr-1">
            <div className="sidebar-card w-full rounded-[1.6rem] p-5">
              <SmartLink to="/" className="block" onClick={onClose}>
                <div className="avatar block transition ease-in-out hover:scale-[102%]">
                  <div className="h-[5rem] w-[5rem] overflow-hidden rounded-full border border-base-300/70">
                    <img className="h-full w-full object-cover" src="/profile-photo.jpg" alt="Yaroslav Shapran profile avatar" />
                  </div>
                </div>
              </SmartLink>
              <div className="mt-4">
                <div className="font-display text-[1.68rem] leading-none">{profile.name}</div>
                <div className="sidebar-meta mt-2 text-sm uppercase tracking-[0.18em]">{primaryRole}</div>
                <div className="mt-4 grid gap-2.5 text-sm">
                  <a
                    className="sidebar-identity-row rounded-2xl px-3 py-2.5"
                    href={`mailto:${profile.email}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="sidebar-identity-label">Email</span>
                    <span className="sidebar-identity-value">{profile.email}</span>
                  </a>
                  <div className="sidebar-identity-row rounded-2xl px-3 py-2.5">
                    <span className="sidebar-identity-label">Location</span>
                    <span className="sidebar-identity-value">{profile.location}</span>
                  </div>
                  <a
                    className="sidebar-identity-row rounded-2xl px-3 py-2.5"
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="sidebar-identity-label">Resume</span>
                    <span className="sidebar-identity-value">Open PDF</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-4 px-1">
              <ThemeToggle />
            </div>

            <div className="sidebar-section-label mt-6 px-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em]">
              Navigate
            </div>

            <ul className="menu mt-2 gap-1 menu-md">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.href}
                    onClick={onClose}
                    className={`sidebar-link rounded-2xl border py-3 text-base ${activeItemId === item.id ? "is-active" : ""}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <a
                  className="sidebar-link rounded-2xl border py-3 text-base"
                  href={`mailto:${profile.email}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onClose}
                >
                  Contact
                </a>
              </li>
            </ul>

            <div className="mt-6 block h-10 pointer-events-none [mask-image:linear-gradient(transparent,#000000)]"></div>
            <div className="sidebar-footer-panel rounded-[1.4rem] px-4 pb-4 pt-3">
              <div className="sidebar-section-label mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em]">
                Connect
              </div>
              <div className="social-icons flex flex-wrap gap-2">
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="sidebar-icon-link inline-flex h-10 w-10 items-center justify-center rounded-2xl border" aria-label="Resume PDF" title="Resume PDF">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V8h4.5"></path>
                  </svg>
                </a>
                {hasPersonalGithub && (
                  <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="sidebar-icon-link inline-flex h-10 w-10 items-center justify-center rounded-2xl border" aria-label="Github" title="Github">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path>
                    </svg>
                  </a>
                )}
                <a href={`mailto:${profile.email}`} target="_blank" rel="noreferrer" className="sidebar-icon-link inline-flex h-10 w-10 items-center justify-center rounded-2xl border" aria-label="Email" title="Email">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4a2 2 0 0 0-2 2v.217l10 5.714 10-5.714V6a2 2 0 0 0-2-2Zm2 4.383-9.504 5.431a1 1 0 0 1-.992 0L2 8.383V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.383Z"></path>
                  </svg>
                </a>
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="sidebar-icon-link inline-flex h-10 w-10 items-center justify-center rounded-2xl border" aria-label="Linkedin" title="Linkedin">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="4.983" cy="5.009" r="2.188"></circle>
                    <path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"></path>
                  </svg>
                </a>
                <a href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`} target="_blank" rel="noreferrer" className="sidebar-icon-link inline-flex h-10 w-10 items-center justify-center rounded-2xl border" aria-label="Phone" title="Phone">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.24 1.02l-2.2 2.2Z"></path>
                  </svg>
                </a>
              </div>
              <p className="sidebar-note mt-4 text-xs leading-6">
                Open to remote product engineering work across AI, platform, and full-stack systems.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
