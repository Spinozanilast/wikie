import {
  IndependentWikisCollection,
  independentWikisItem,
} from "~/shared/independents";

export default defineBackground(() => {
  const dataUrl = browser.runtime.getURL("/independent-wiki-data.json");

  browser.runtime.onInstalled.addListener(async () => {
    await initializeIndependents(dataUrl);
  });

  browser.runtime.onStartup.addListener(async () => {
    await initializeIndependents(dataUrl);
  });
});

async function initializeIndependents(dataUrl: string) {
  await IndependentWikisCollection.prefetch(dataUrl);

  independentWikisItem.setValue(IndependentWikisCollection.getCollection());
}
