import {
  createContext,
  type PropsWithChildren,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
export const STORAGE_KEY = "portfolio-theme";

const paintTheme = (mode: ThemeMode) => {
  document.documentElement.dataset.theme =
    mode === "dark" ? "portfolio-dark" : "portfolio-light";
  document.documentElement.dataset.colorMode = mode;
  document.documentElement.style.colorScheme = mode;
};

export function ThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "dark";

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return "dark";
  });

  useLayoutEffect(() => {
    paintTheme(mode);
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      toggle: () => setMode((current) => (current === "dark" ? "light" : "dark")),
    }),
    [mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
