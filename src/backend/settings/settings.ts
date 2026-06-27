import { storage } from "@wxt-dev/storage";

export type StylesSettings = {
  CornerPosition: "left-top" | "right-top" | "right-bottom" | "left-bottom";
  InjectionMode: "fixed" | "inner";
};

export const DefaultStyleSettings: Settings = {
  CornerPosition: "right-bottom",
  InjectionMode: "fixed",
};

export type Settings = StylesSettings;

export const settingsItem = storage.defineItem<Settings>("local:settings", {
  fallback: DefaultStyleSettings,
});

const cornerPositions: Record<
  string,
  { top?: string; bottom?: string; left?: string; right?: string }
> = {
  "left-top": { top: "16px", left: "16px" },
  "right-top": { top: "16px", right: "16px" },
  "right-bottom": { bottom: "16px", right: "16px" },
  "left-bottom": { bottom: "16px", left: "16px" },
};

export function applyCornerPosition(
  wrapper: HTMLElement,
  position: keyof typeof cornerPositions,
) {
  const pos = cornerPositions[position];
  wrapper.style.setProperty("--badge-top", pos.top ?? "auto");
  wrapper.style.setProperty("--badge-bottom", pos.bottom ?? "auto");
  wrapper.style.setProperty("--badge-left", pos.left ?? "auto");
  wrapper.style.setProperty("--badge-right", pos.right ?? "auto");
}
