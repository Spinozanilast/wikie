import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import {
  DefaultStyleSettings,
  Settings as SettingsType,
  settingsItem,
} from "~/backend/settings/settings";

import { Icon } from "@phosphor-icons/react";
import { CaretDownIcon } from "@phosphor-icons/react/dist/csr/CaretDown";

type SettingsUpdate = {
  key: keyof SettingsType;
  value: SettingsType[keyof SettingsType];
};

type SettingsContextType = {
  settings: SettingsType;
  updateValue: (update: SettingsUpdate) => void;
  resetValues: () => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

type SettingsProviderProps = {
  children: ReactNode;
  initialValues?: SettingsType;
  onChange?: (settings: SettingsType) => void;
};

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within a Settings provider");
  return context;
}

const Settings: React.FC<SettingsProviderProps> & {
  Section: React.FC<SettingsSectionProps>;
  Item: React.FC<SettingsItemProps>;
} = ({
  children,
  initialValues = DefaultStyleSettings,
  onChange,
}: SettingsProviderProps) => {
  const [settings, setSettings] = useState<SettingsType>(initialValues);

  useEffect(() => {
    settingsItem.getValue().then((stored) => {
      setSettings(stored);
    });
  }, []);

  const updateValue = useCallback(
    (update: SettingsUpdate) => {
      setSettings((prev) => {
        const changedSettings = { ...prev, [update.key]: update.value };
        onChange?.(changedSettings);
        settingsItem.setValue(changedSettings);
        return changedSettings;
      });
    },
    [onChange],
  );

  const resetValues = useCallback(async () => {
    setSettings(DefaultStyleSettings);
    onChange?.(DefaultStyleSettings);
    await settingsItem.setValue(DefaultStyleSettings);
  }, [onChange]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateValue,
        resetValues,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

type SettingsSectionProps = {
  id: string;
  icon: Icon;
  title: string;
  children: ReactNode;
};

const SettingsSection = ({ id, icon: Icon, title, children }: SettingsSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div id={id}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-secondary/10 relative w-full cursor-pointer rounded-sm py-2"
      >
        <Icon
          size={24}
          className="absolute top-1/2 left-3 -translate-y-1/2 transform"
        />
        <h1 className="text-center text-lg">{title}</h1>
        <CaretDownIcon
          className={`absolute top-1/2 right-3 -translate-y-1/2 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div className={`overflow-hidden ${isOpen ? "h-fit" : "h-0"}`}>
        {children}
        {isOpen && <hr className="text-secondary/50 mt-2" />}
      </div>
    </div>
  );
};

type SettingsItemProps = {
  title: string;
  icon: Icon;
  description?: ReactNode;
  children: ReactNode;
};

const SettingsItem = ({
  title,
  icon: Icon,
  description,
  children,
}: SettingsItemProps) => {
  return (
    <div className="mt-2 flex w-full items-center justify-between text-left">
      <div className="flex max-w-1/2 flex-col gap-2">
        <h2 className="flex items-center gap-2">
          <Icon size={18} /> {title}
        </h2>
        <p className="text-sm">{description}</p>
      </div>
      <div className="max-w-1/2">{children}</div>
    </div>
  );
};

Settings.Section = SettingsSection;
Settings.Item = SettingsItem;

export default Settings;
