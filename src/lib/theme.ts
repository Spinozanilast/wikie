import { storage } from "@wxt-dev/storage";

export const WikieStorageThemeKey = "local:theme";

export const themeItem = storage.defineItem<Theme>(WikieStorageThemeKey, {
  fallback: "system",
});

export type Theme = "light" | "dark" | "system";
