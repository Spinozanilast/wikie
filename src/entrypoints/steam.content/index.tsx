import "./styles.css";

import ReactDOM from "react-dom/client";

import { applyCornerPosition, settingsItem } from "~/backend/settings/settings.ts";
import { themeItem } from "~/lib/theme";
import { AppWikisInfoStore } from "~/contexts/WikisContext.tsx";
import SteamBadge from "./SteamBadge.tsx";

import "~/assets/styles.css";
import { renderUiVariantsOnDisplayModeChange } from "~/lib/display.ts";

export default defineContentScript({
  matches: ["*://store.steampowered.com/app/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    await renderUiVariantsOnDisplayModeChange(async () =>
      createShadowRootUi(ctx, {
        name: "wikie-steam",
        position: "inline",
        anchor: "body",
        onMount: (container) => {
          const wrapper = document.createElement("div");

          container.append(wrapper);

          const root = ReactDOM.createRoot(wrapper);

          themeItem.getValue().then((newTheme) => {
            wrapper.classList.toggle("dark", newTheme === "dark");
          });

          settingsItem.getValue().then((settings) => {
            applyCornerPosition(wrapper, settings.CornerPosition);
          });

          root.render(
            <AppWikisInfoStore>
              <SteamBadge />
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
