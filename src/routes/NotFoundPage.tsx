import { SmartLink } from "../components/SmartLink";
import { AppShell } from "../components/AppShell";

export function NotFoundPage() {
  return (
    <AppShell title="404" includeSidebar={false}>
      <div className="hero min-h-[72vh]">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <div className="mb-6 text-7xl font-black text-base-content">404</div>
            <h1 className="text-3xl font-bold">The page you&apos;re looking for couldn&apos;t be found.</h1>
            <p className="py-6 text-base-content/72">
              The route does not exist in the React version of the portfolio, or the link is outdated.
            </p>
            <SmartLink to="/" className="btn btn-primary border-0 px-6">
              Home
            </SmartLink>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
