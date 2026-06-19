import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { WikieStorageThemeKey, Theme } from "~/lib/theme";
import { themeItem } from "~/lib/theme";

interface ThemeContextType {
  theme?: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

async function getInitialTheme(): Promise<Theme> {
  const stored = await themeItem.getValue();
  if (stored === "dark" || stored === "light" || stored === "system") return stored;
  return "system";
}

async function applyTheme(theme: Theme): Promise<void> {
  const isDark = theme === "dark" || (theme === "system" && getSystemPrefers());
  document.documentElement.classList.toggle("dark", isDark);
  await themeItem.setValue(isDark ? "dark" : "light");
}

function getSystemPrefers(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>();

  useEffect(() => {
    getInitialTheme().then((stored) => {
      setTheme(stored);
    });
  }, []);

  useEffect(() => {
    if (theme === undefined) return;
    (async () => {
      await applyTheme(theme);
    })();
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const toggle = () =>
    setTheme((t) => (t === "light" ? "dark" : t === "dark" ? "system" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
