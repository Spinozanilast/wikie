import { SteamLogoIcon } from "@phosphor-icons/react/dist/csr/SteamLogo";
import Logo from "~/components/Logo";

type WelcomeScreenProps = {
  localStorageKey: string;
  onDone: () => void;
};

function WelcomeView({ localStorageKey, onDone }: WelcomeScreenProps) {
  return (
    <div className="font-pixelify my-5 flex flex-col items-center justify-center gap-4">
      <ThemeToggle className="absolute top-2 right-2" />
      <Logo className="max-w-24" />
      <h1 className="text-dm-11 font-departure text-shadow-[0px_5px_1px_var(--color-tertiary)]">
        WIKIe
      </h1>
      <p className="max-w-1/2 text-justify text-xl italic">
        for those, who wanna find all the{" "}
        <span className="underline-1 text-2xl font-bold text-shadow-[0px_3px_1px_var(--color-tertiary)]">
          things
        </span>{" "}
        about the game you are watching in{" "}
        <p className="my-2 text-center text-3xl text-nowrap">
          Steam &nbsp;
          <SteamLogoIcon className="inline" size={32} />
        </p>
      </p>
      <button
        className="bg-tertiary group cursor-pointer rounded-md p-2 font-bold transition-transform hover:scale-105 active:scale-100 active:opacity-95"
        onClick={() => {
          localStorage.setItem(localStorageKey, "true");
          onDone();
        }}
      >
        Get Started
        <span className="group-hover:text-secondary transition-colors group-hover:scale-105">
          &nbsp;&nbsp;→
        </span>
      </button>
    </div>
  );
}

export default WelcomeView;
