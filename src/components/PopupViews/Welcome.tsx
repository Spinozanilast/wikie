import Logo from "~/components/Logo";

type WelcomeScreenProps = {
  localStorageKey: string;
  onDone: () => void;
};

function WelcomeScreen({ localStorageKey, onDone }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-120 flex-col items-center justify-center gap-4">
      <ThemeToggle className="absolute top-2 right-2" />
      <Logo className="max-w-24" />
      <h1 className="text-9xl text-shadow-[0px_5px_1px_var(--color-tertiary)]">
        WIKIe
      </h1>
      <p className="max-w-1/2 text-justify text-xl italic">
        for those, who wanna find all the things about the game he is watching in
      </p>
      <button
        className="bg-tertiary group cursor-pointer rounded-md p-2 font-bold transition-transform hover:scale-105 active:scale-100 active:opacity-95"
        onClick={() => {
          localStorage.setItem(localStorageKey, "true");
          onDone();
        }}
      >
        Get Started{" "}
        <span className="group-hover:text-secondary transition-colors group-hover:scale-105">
          →
        </span>
      </button>
    </div>
  );
}

export default WelcomeScreen;
