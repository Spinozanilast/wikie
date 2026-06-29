import { type ContentScriptContext } from "wxt/utils/content-script-context";
import { type DisplayMode, displayModeItem } from "~/backend/settings/settings";

export type UiShadowRootVariantReturnType = Awaited<
  ReturnType<typeof createShadowRootUi>
>;
export type UiIntegratedVariantReturnType = Awaited<
  ReturnType<typeof createIntegratedUi>
>;

export type UIEntryVariant =
  | UiShadowRootVariantReturnType
  | UiIntegratedVariantReturnType;

export async function renderUiVariantsOnDisplayModeChange(
  ctx: ContentScriptContext,
  shadowDisplayModeUiCallback: () => Promise<UIEntryVariant>,
  inlineDisplayModeUiCallback?: () => Promise<UIEntryVariant>,
): Promise<void> {
  let lastUIEntry: UIEntryVariant | undefined;

  const unwatchDisplayMode = displayModeItem.watch((currentDisplayMode) => {
    displayUI(currentDisplayMode);
  });

  const displayUI = async (displayMode: DisplayMode) => {
    if (lastUIEntry) {
      lastUIEntry.remove();
    }

    if (displayMode === "shadow") {
      const ui = await shadowDisplayModeUiCallback();

      lastUIEntry = ui;
      lastUIEntry.mount();
    } else {
      if (!inlineDisplayModeUiCallback) return;
      const ui = await inlineDisplayModeUiCallback();

      lastUIEntry = ui;
      lastUIEntry.mount();
    }
  };

  const firstRenderDisplayMode = await displayModeItem.getValue();
  await displayUI(firstRenderDisplayMode);

  ctx.onInvalidated(() => {
    unwatchDisplayMode();
  });
}
