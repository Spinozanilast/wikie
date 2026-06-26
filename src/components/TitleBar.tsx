import { cn } from "@/lib/utils";

type TitleBarProps = {
  displayTitle?: string;
};

function TitleBar({ displayTitle }: TitleBarProps) {
  return (
    <div className="b-1 border-tertiary bg-secondary/10 rounded-2xls text-dm-2 font-departure mb-4 flex w-full flex-row items-center justify-between border-2 p-2 transition-colors">
      <Logo className="max-w-10 rounded-lg" />
      {!displayTitle && (
        <a href="https://github.com/spinozanilast/wikie">
          <h1 className="text-shadow-[0px_2px_1px_var(--color-tertiary)]">WIKIe</h1>
        </a>
      )}
      {displayTitle && <h1>{displayTitle}</h1>}
      <ThemeToggle />
    </div>
  );
}

export default TitleBar;
