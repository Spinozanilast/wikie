import { storage } from "@wxt-dev/storage";

export const themeItem = storage.defineItem<Theme>("local:theme", {
  fallback: "system",
});

export type Theme = "light" | "dark" | "system";
