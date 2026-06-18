import "./styles.css";

import ReactDOM from "react-dom/client";
import SteamBadge from "./SteamBadge.tsx";
import React from "react";
import "~/assets/styles.css";

export default defineContentScript({
  matches: ["*://store.steampowered.com/app/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "wikie-steam",
      position: "inline",
      anchor: "body",
      onMount: (container) => {
        const wrapper = document.createElement("div");

        container.append(wrapper);

        const root = ReactDOM.createRoot(wrapper);
        root.render(<SteamBadge />);

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
