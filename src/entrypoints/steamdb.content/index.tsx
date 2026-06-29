import "../steam.content/styles.css";

import ReactDOM from "react-dom/client";

import { applyCornerPosition, settingsItem } from "~/backend/settings/settings.ts";
import { WikiDataService } from "~/backend/wikis/gameWikiData.ts";
import { reportWikis } from "~/backend/messaging/wikis.ts";
import { extractSteamUrlAppId } from "~/lib/url.ts";
import { renderUiVariantsOnDisplayModeChange } from "~/lib/display.ts";
import { themeItem } from "~/lib/theme";
import SteamDbBadge from "./SteamDbBadge.tsx";
import SteaemDbLinksBadge from "@/features/badges/SteamDbLinksBadge.tsx";

import "~/assets/styles.css";

export default defineContentScript({
  matches: ["*://steamdb.info/app/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const appId = extractSteamUrlAppId();
    const appName =
      document.body.querySelector('.pagehead-title h1[itemprop="name"]')?.textContent ??
      "";

    if (!appId) return;

    const wikiData = await WikiDataService.precompute(appId, appName);

    reportWikis({
      appId,
      appName,
      source: "steamdb",
      wikisFoundCount: wikiData.wikis.length,
      wikis: wikiData.wikis,
    });

    renderUiVariantsOnDisplayModeChange(
      ctx,
      () =>
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

            root.render(<SteamDbBadge wikiData={wikiData} displayMode="shadow" />);

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
        createIntegratedUi(ctx, {
          position: "inline",
          anchor: "nav.app-links",
          onMount: (wrapper) => {
            const root = ReactDOM.createRoot(wrapper);

            root.render(<SteaemDbLinksBadge wikiData={wikiData} badgeFor="steamdb" />);

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
