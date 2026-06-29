import { LayoutIcon } from "@phosphor-icons/react/dist/csr/Layout";

import TitleBar from "~/components/TitleBar";
import Settings, { useSettings } from "./Settings";

import { ArrowCircleUpLeftIcon } from "@phosphor-icons/react/dist/csr/ArrowCircleUpLeft";
import { ArrowCircleUpRightIcon } from "@phosphor-icons/react/dist/csr/ArrowCircleUpRight";
import { ArrowCircleDownLeftIcon } from "@phosphor-icons/react/dist/csr/ArrowCircleDownLeft";
import { ArrowCircleDownRightIcon } from "@phosphor-icons/react/dist/csr/ArrowCircleDownRight";
import { CornersInIcon } from "@phosphor-icons/react/dist/csr/CornersIn";
import { SelectionSlashIcon } from "@phosphor-icons/react/dist/csr/SelectionSlash";
import { TextAlignLeftIcon } from "@phosphor-icons/react/dist/csr/TextAlignLeft";

import { DisplayMode } from "~/backend/settings/settings";

type SettingsScreenProps = {
  openMainPage: () => void;
};

type CornerButton = {
  position: "left-top" | "right-top" | "right-bottom" | "left-bottom";
  title: string;
  icon: typeof ArrowCircleUpLeftIcon;
};

const cornerButtons: CornerButton[] = [
  {
    position: "left-top",
    title: "Move wikis panel to left top corner",
    icon: ArrowCircleUpLeftIcon,
  },
  {
    position: "right-top",
    title: "Move wikis panel to right top corner",
    icon: ArrowCircleUpRightIcon,
  },
  {
    position: "left-bottom",
    title: "Move wikis panel to left bottom corner",
    icon: ArrowCircleDownLeftIcon,
  },
  {
    position: "right-bottom",
    title: "Move wikis panel to right bottom corner",
    icon: ArrowCircleDownRightIcon,
  },
];

function CornerSelector() {
  const { settings, updateValue } = useSettings();

  return (
    <div className="grid grid-cols-2 grid-rows-2 place-items-center gap-4">
      {cornerButtons.map(({ position, title, icon: Icon }) => (
        <button
          key={position}
          title={title}
          onClick={() => updateValue({ key: "CornerPosition", value: position })}
          className={`btn ${settings.CornerPosition === position ? "text-tertiary" : ""}`}
        >
          <Icon size={32} />
        </button>
      ))}
    </div>
  );
}

const displayModes: {
  mode: DisplayMode;
  title: string;
  icon: typeof SelectionSlashIcon;
}[] = [
  {
    mode: "shadow",
    title: "Floating corner panel",
    icon: SelectionSlashIcon,
  },
  {
    mode: "inline",
    title: "Inline in page",
    icon: TextAlignLeftIcon,
  },
];

function DisplayModeSelector() {
  const { displayMode, updateDisplayMode } = useSettings();

  return (
    <div className="flex gap-4">
      {displayModes.map(({ mode, title, icon: Icon }) => (
        <button
          key={mode}
          title={title}
          onClick={() => updateDisplayMode(mode)}
          className={`btn ${displayMode === mode ? "text-tertiary" : ""}`}
        >
          <Icon size={28} />
        </button>
      ))}
    </div>
  );
}

function SettingsContent() {
  return (
    <Settings>
      <Settings.Section id="style-settings" icon={LayoutIcon} title="Style Settings">
        <Settings.Item
          icon={SelectionSlashIcon}
          title="Display mode"
          description={
            <>
              Switch between <span className="text-tertiary font-bold">Shadow</span>{" "}
              (floating corner panel) and{" "}
              <span className="text-tertiary font-bold">Inline</span> (in-page flow)
            </>
          }
        >
          <DisplayModeSelector />
        </Settings.Item>
        <Settings.Item
          icon={CornersInIcon}
          title="Display corner"
          description={
            <>
              Select the corner where the wikis panel will be displayed in{" "}
              <span className="text-tertiary font-bold">Corner Mode</span>
            </>
          }
        >
          <CornerSelector />
        </Settings.Item>
      </Settings.Section>
    </Settings>
  );
}

function SettingsView({ openMainPage }: SettingsScreenProps) {
  return (
    <div className="font-pixelify">
      <TitleBar displayTitle="Settings" />
      <SettingsContent />
    </div>
  );
}

export default SettingsView;
