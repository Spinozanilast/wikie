import { MoonIcon } from "@phosphor-icons/react/dist/csr/Moon";
import { SunIcon } from "@phosphor-icons/react/dist/csr/Sun";
import { DesktopIcon } from "@phosphor-icons/react/dist/csr/Desktop";

import { useTheme } from "~/contexts/ThemeContext";
import { cn } from "~/lib/utils";

function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();

  const icon =
    theme === "light" ? (
      <MoonIcon size={20} weight="duotone" color="var(--color-tertiary)" />
    ) : theme === "dark" ? (
      <SunIcon size={20} weight="duotone" color="var(--color-tertiary)" />
    ) : (
      <DesktopIcon size={20} weight="duotone" />
    );

  const label = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";

  return (
    <button
      onClick={toggle}
      className={cn(
        "border-tertiary hover:bg-secondary/20 cursor-pointer rounded-lg border-2 p-2 transition-colors",
        className,
      )}
      aria-label={`Switch to ${label} mode`}
    >
      {icon}
    </button>
  );
}

export default ThemeToggle;
