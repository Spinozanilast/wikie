import { onMessage } from "webext-bridge/background";
import {
  openWikisPagesItem,
  OpenWikisMessages,
  WikipediaMessages,
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

  // Handle Wikipedia page search from content scripts
  onMessage<{ gameName: string }>(
    WikipediaMessages.SearchPage,
    async ({ data: { gameName } }) => {
      const encodedName = encodeURIComponent(gameName);
      const gameUrl = `https://en.wikipedia.org/wiki/${encodedName}`;
      const postfixedUrl = `${gameUrl}_(video_game)`;

      // Try postfixed URL first
      let response = await fetch(postfixedUrl);
      if (response.ok) return { url: postfixedUrl };

      // Try plain game page
      response = await fetch(gameUrl);
      if (response.ok) return { url: gameUrl };

      // Fall back to search API
      const searchUrl = `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${encodedName}&limit=5`;
      const searchResponse = await fetch(searchUrl);
      if (searchResponse.ok) {
        const data = await searchResponse.json();
        if (data.pages?.length > 0) {
          for (const page of data.pages) {
            if ((page.description as string)?.includes("video game")) {
              return {
                url: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.excerpt)}`,
              };
            }
          }
        }
      }

      return { url: null };
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
