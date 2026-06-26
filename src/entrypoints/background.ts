import { onMessage } from "webext-bridge/background";
import {
  openWikisPagesItem,
  OpenWikisMessages,
  type OpenWikiPage,
} from "~/lib/messaging/wikis";
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

  onMessage<Omit<OpenWikiPage, "tabId">>(
    OpenWikisMessages.ReportWikis,
    async (message) => {
      const tabId = message.sender.tabId;
      if (!tabId) return;

      const { data } = message;
      const currentWikis = await openWikisPagesItem.getValue();
      const wikiPage: OpenWikiPage = { ...data, tabId };

      const existingIndex = currentWikis.findIndex((w) => w.tabId === tabId);
      if (existingIndex >= 0) {
        currentWikis[existingIndex] = wikiPage;
      } else {
        currentWikis.push(wikiPage);
      }

      await openWikisPagesItem.setValue([...currentWikis]);
    },
  );

  // Switch to the tab that requested the switch
  onMessage<{ tabId: number }>(
    OpenWikisMessages.SwitchToTab,
    async ({ data: { tabId } }) => {
      browser.tabs.update(tabId, { active: true });
    },
  );

  // Remove wikis data for tabs that are being closed
  browser.tabs.onRemoved.addListener(async (tabId) => {
    const currentWikis = await openWikisPagesItem.getValue();
    const filtered = currentWikis.filter((w) => w.tabId !== tabId);
    if (filtered.length !== currentWikis.length) {
      await openWikisPagesItem.setValue(filtered);
    }
  });
});

async function initializeIndependents(dataUrl: string) {
  await IndependentWikisCollection.prefetch(dataUrl);

  independentWikisItem.setValue(IndependentWikisCollection.getCollection());
}
