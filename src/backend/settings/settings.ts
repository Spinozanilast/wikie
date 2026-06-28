import { storage } from "@wxt-dev/storage";

export type DisplayMode = "shadow" | "shadow-inline";

export type StylesSettings = {
  CornerPosition: "left-top" | "right-top" | "right-bottom" | "left-bottom";
};

export const DefaultStyleSettings: Settings = {
  CornerPosition: "right-bottom",
};

export const DefaultDisplayMode: DisplayMode = "shadow";

export type Settings = StylesSettings;

export const settingsItem = storage.defineItem<Settings>("local:settings", {
  fallback: DefaultStyleSettings,
});

export const displayModeItem = storage.defineItem<DisplayMode>("local:displayMode", {
  fallback: DefaultDisplayMode,
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

export function applyDisplayMode(wrapper: HTMLElement, mode: DisplayMode) {
  wrapper.classList.toggle("inline-mode", mode === "shadow-inline");
}
