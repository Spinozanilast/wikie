import "../steam.content/styles.css";

import ReactDOM from "react-dom/client";

import { themeItem } from "~/lib/theme";
import SteamDbBadge from "./SteamDbBadge.tsx";

import "~/assets/styles.css";

export default defineContentScript({
  matches: ["*://steamdb.info/app/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
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

        if (!appName) return;

        root.render(<SteamDbBadge appName={appName} />);

        const unwatch = themeItem.watch((newTheme) => {
          wrapper.classList.toggle("dark", newTheme === "dark");
        });

        return { root, wrapper };
      },
      onRemove: (elements) => {
        elements?.root.unmount();
        elements?.wrapper.remove();
      },
    });

    ui.mount();
  },
});
