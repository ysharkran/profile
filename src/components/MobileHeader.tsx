import { profile } from "../data/portfolio";
import { SmartLink } from "./SmartLink";
import { ThemeToggle } from "./ThemeToggle";

type MobileHeaderProps = {
  onMenuOpen: () => void;
};

export function MobileHeader({ onMenuOpen }: MobileHeaderProps) {
  return (
    <div className="sticky top-0 z-30 flex h-16 w-full justify-center border-b border-base-300/70 bg-base-100/85 text-base-content backdrop-blur-xl transition-all duration-100 lg:hidden">
      <div className="navbar max-w-[100vw] px-3">
        <div className="navbar-start">
          <button type="button" className="btn btn-square btn-ghost" onClick={onMenuOpen} aria-label="Open navigation">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <div className="navbar-center">
          <SmartLink to="/" className="btn btn-ghost font-display text-lg normal-case">
            {profile.name}
          </SmartLink>
        </div>
        <div className="navbar-end">
          <ThemeToggle compact={true} />
        </div>
      </div>
    </div>
  );
}
