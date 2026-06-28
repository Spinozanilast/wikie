import "../steam.content/styles.css";

import ReactDOM from "react-dom/client";

import { applyCornerPosition, settingsItem } from "~/backend/settings/settings.ts";
import { themeItem } from "~/lib/theme";
import SteamDbBadge from "./SteamDbBadge.tsx";

import "~/assets/styles.css";
import { AppWikisInfoStore } from "@/contexts/WikisContext.tsx";
import { renderUiVariantsOnDisplayModeChange } from "@/lib/display.ts";

export default defineContentScript({
  matches: ["*://steamdb.info/app/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    renderUiVariantsOnDisplayModeChange(() =>
      createShadowRootUi(ctx, {
        name: "wikie-steam",
        position: "inline",
        anchor: "body",
        onMount: (container) => {
          const wrapper = document.createElement("div");

          const appName = document.body.querySelector(
            '.pagehead-title h1[itemprop="name"]',
          )?.textContent;

          container.append(wrapper);

          const root = ReactDOM.createRoot(wrapper);

          themeItem.getValue().then((newTheme) => {
            wrapper.classList.toggle("dark", newTheme === "dark");
          });

          settingsItem.getValue().then((settings) => {
            applyCornerPosition(wrapper, settings.CornerPosition);
          });

          if (!appName) return;

          root.render(
            <AppWikisInfoStore>
              <SteamDbBadge appName={appName} />
            </AppWikisInfoStore>,
          );

          const unwatchTheme = themeItem.watch((newTheme) => {
            wrapper.classList.toggle("dark", newTheme === "dark");
          });

          const unwatchSettings = settingsItem.watch((settings) => {
            applyCornerPosition(wrapper, settings.CornerPosition);
          });

          return { root, wrapper, unwatchTheme, unwatchSettings };
        },
        onRemove: (elements) => {
          elements?.root.unmount();
          elements?.wrapper.remove();
          elements?.unwatchTheme?.();
          elements?.unwatchSettings?.();
        },
      }),
    );
  },
});
