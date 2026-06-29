import "./styles.css";

import ReactDOM from "react-dom/client";

import { applyCornerPosition, settingsItem } from "~/backend/settings/settings.ts";
import { themeItem } from "~/lib/theme";
import { renderUiVariantsOnDisplayModeChange } from "~/lib/display.ts";
import { WikiDataService } from "~/backend/wikis/gameWikiData.ts";
import { reportWikis } from "~/backend/messaging/wikis.ts";
import { extractSteamUrlAppIdAndName } from "~/lib/url.ts";
import SteamBadge from "./SteamBadge.tsx";

import "~/assets/styles.css";

export default defineContentScript({
  matches: ["*://store.steampowered.com/app/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const data = extractSteamUrlAppIdAndName();
    if (!data) return;

    const wikiData = await WikiDataService.precompute(data.appId, data.name);

    reportWikis({
      appId: data.appId,
      appName: data.name,
      source: "steam",
      wikisFoundCount: wikiData.wikis.length,
      wikis: wikiData.wikis,
    });

    await renderUiVariantsOnDisplayModeChange(
      ctx,
      async () =>
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
              <SteamBadge wikiData={wikiData} displayMode="shadow" />,
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
      async () =>
        createShadowRootUi(ctx, {
          name: "wikie-steam-inline",
          position: "inline",
          anchor: ".apphub_HeaderStandardTop",
          onMount: (wrapper) => {
            const root = ReactDOM.createRoot(wrapper);

            root.render(
              <SteamBadge wikiData={wikiData} displayMode="inline" />,
            );

            return { root, wrapper };
          },
          onRemove: (elements) => {
            elements?.root.unmount();
            elements?.wrapper.remove();
          },
        }),
    );
  },
});
