import { type DisplayMode, displayModeItem } from "~/backend/settings/settings";

export type UiShadowRootVariantReturnType = Awaited<
  ReturnType<typeof createShadowRootUi>
>;
export type UiIntegratedVariantReturnType = Awaited<
  ReturnType<typeof createIntegratedUi>
>;

export type UIEntryVariant =
  | UiShadowRootVariantReturnType
  | UiIntegratedVariantReturnType
  | undefined;

export async function renderUiVariantsOnDisplayModeChange(
  shadowRootUiCreateCallback: () => Promise<UiShadowRootVariantReturnType>,
  integratedUiCreateCallback?: () => Promise<UiIntegratedVariantReturnType>,
) {
  let lastUIEntry: UIEntryVariant;

  const watchDisplayMode = displayModeItem.watch((currentDisplayMode) => {
    displayUI(currentDisplayMode);
  });

  const displayUI = async (displayMode: DisplayMode) => {
    if (lastUIEntry) {
      lastUIEntry.remove();
    }

    if (displayMode === "shadow") {
      const ui = await shadowRootUiCreateCallback();

      lastUIEntry = ui;
      lastUIEntry.mount();
    }
  };

  const firstRenderDisplayMode = await displayModeItem.getValue();
  await displayUI(firstRenderDisplayMode);
}
