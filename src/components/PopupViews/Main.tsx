import ThemeToggle from "~/components/ThemeToggle";

function MainScreen() {
  return (
    <div className="min-h-120 w-full">
      <div className="b-1 border-tertiary bg-secondary/10 rounded-2xls mb-4 flex w-full flex-row items-center justify-between border-2 p-2 transition-colors">
        <Logo className="max-w-10 rounded-lg" />
        <a href="https://github.com/spinozanilast/wikie">
          <h1 className="text-2xl text-shadow-[0px_2px_1px_var(--color-tertiary)]">
            WIKIe
          </h1>
        </a>
        <ThemeToggle />
      </div>
    </div>
  );
}

export default MainScreen;
