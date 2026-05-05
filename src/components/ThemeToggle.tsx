import { useTheme } from "./ThemeProvider";

type ThemeToggleProps = {
  compact?: boolean;
};

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { mode, toggle } = useTheme();
  const nextLabel = mode === "dark" ? "Light mode" : "Dark mode";

  return (
    <button
      type="button"
      className={[
        "btn border shadow-none hover:shadow-lg",
        compact
          ? "btn-square border-base-300/80 bg-base-100/70 text-base-content hover:bg-base-100"
          : "w-full justify-between normal-case border-base-300/80 bg-base-100/70 text-base-content hover:bg-base-100",
      ].join(" ")}
      onClick={toggle}
      aria-label="Toggle theme"
      aria-pressed={mode === "dark"}
    >
      <span className="flex items-center gap-2">
        {mode === "light" ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-17a1 1 0 0 1-1-1V3a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm9 8a1 1 0 0 1 0 2h-1a1 1 0 1 1 0-2h1ZM5 13a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h1Zm12.36 6.78a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 0 1 1.41-1.41l.71.7a1 1 0 0 1 0 1.42ZM8.05 8.46a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 1 1 1.41-1.41l.71.7a1 1 0 0 1 0 1.42Zm9.31-1.41a1 1 0 0 1 0 1.41l-.71.71a1 1 0 0 1-1.41-1.41l.7-.71a1 1 0 0 1 1.42 0ZM8.05 15.54a1 1 0 0 1 0 1.41l-.71.71a1 1 0 0 1-1.41-1.41l.7-.71a1 1 0 0 1 1.42 0Z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 0 1 11.21 3a1 1 0 0 0-1.25-1.14A10 10 0 1 0 22.14 14a1 1 0 0 0-1.14-1.21Z" />
          </svg>
        )}
        {!compact && <span>{nextLabel}</span>}
      </span>
    </button>
  );
}
