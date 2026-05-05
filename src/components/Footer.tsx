import { profile } from "../data/portfolio";

export function Footer() {
  return (
    <footer className="footer footer-center block mb-5 pt-10">
      <div className="pb-2">&copy; {new Date().getFullYear()} {profile.name}</div>
      <div className="inline opacity-75">
        Building reliable software, thoughtful products, and long-term engineering value.
      </div>
    </footer>
  );
}
