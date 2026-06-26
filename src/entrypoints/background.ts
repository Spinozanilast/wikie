import { onMessage } from "webext-bridge/background";
import {
  openWikisPagesItem,
  OpenWikisMessages,
  reportWikisHandler,
  type OpenWikiPage,
} from "~/backend/messaging/wikis";
import {
  IndependentWikisCollection,
  independentWikisItem,
} from "~/backend/wikis/independents";
import {
  searchWikipediaPageHandler,
  WikipediaMessages,
} from "~/backend/messaging/wikipedia";

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
      await reportWikisHandler(tabId, data);
    },
  );

  // Switch to the tab that requested the switch
  onMessage<{ tabId: number }>(
    OpenWikisMessages.SwitchToTab,
    async ({ data: { tabId } }) => {
      browser.tabs.update(tabId, { active: true });
    },
  );

  // Handle Wikipedia page search from content scripts
  onMessage<{ gameName: string }>(
    WikipediaMessages.SearchPage,
    async ({ data: { gameName } }) => {
      const result = await searchWikipediaPageHandler(gameName);
      return result;
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
