import { searchWikipediaPage } from "~/backend/messaging/wikipedia";
import { independentWikisItem } from "~/backend/wikis/independents";
import { WikisHosts } from "~/lib/hosts";
import type { IndependentWiki } from "~/backend/wikis/independents";

export type WikiLink = {
  url: string;
  host: string;
  title: string;
};

export type IndependentWikiGroup = {
  mainWiki: WikiLink;
  origins: WikiLink[];
};

export type GameWikiData = {
  appId: string;
  appName: string;
  wikis: WikiLink[];
  steamUrl: string;
  steamDbUrl: string;
  wikipediaUrl: string | null;
  independentGroups: IndependentWikiGroup[];
};

export class WikiDataService {
  static async precompute(appId: string, appName: string): Promise<GameWikiData> {
    const wikis: WikiLink[] = [];

    const steamUrl = `https://store.steampowered.com/app/${appId}/`;
    const steamWiki: WikiLink = {
      title: "Steam",
      host: WikisHosts.Steam,
      url: steamUrl,
    };
    wikis.push(steamWiki);

    const steamDbUrl = `https://steamdb.info/app/${appId}/charts`;
    const steamDbWiki: WikiLink = {
      title: "SteamDB",
      host: WikisHosts.SteamDB,
      url: steamDbUrl,
    };
    wikis.push(steamDbWiki);

    let wikipediaUrl: string | null = null;
    try {
      const result = await searchWikipediaPage(appName);
      if (result.url) {
        wikipediaUrl = result.url;
        wikis.push({
          title: "Wikipedia game page",
          host: WikisHosts.Wikipedia,
          url: result.url,
        });
      }
    } catch {
      console.error("Failed to search Wikipedia page", appName);
    }

    const independentGroups = await fetchIndependentWikis(appName);
    for (const group of independentGroups) {
      wikis.push(group.mainWiki);
      for (const origin of group.origins) {
        wikis.push(origin);
      }
    }

    return {
      appId,
      appName,
      wikis,
      steamUrl,
      steamDbUrl,
      wikipediaUrl,
      independentGroups,
    };
  }
}

async function fetchIndependentWikis(appName: string): Promise<IndependentWikiGroup[]> {
  try {
    const collection = await independentWikisItem.getValue();
    if (!collection || Object.keys(collection).length === 0) return [];

    const appNameProcessed = appName.replace(" ", "").toLowerCase();
    const gameEntriesKeys = Object.keys(collection).filter((key) =>
      key.startsWith(`en-${appNameProcessed}`),
    );

    const groups: IndependentWikiGroup[] = [];

    for (const key of gameEntriesKeys) {
      const entry = collection[key] as IndependentWiki | undefined;
      if (!entry) continue;

      const mainWiki: WikiLink = {
        url: `https://${entry.destinationBaseUrl}`,
        title: entry.originsLabel || "",
        host: entry.destinationHost || "",
      };

      const origins: WikiLink[] = (entry.origins || []).map((origin) => ({
        url: `https://${origin.originBaseUrl}`,
        title: origin.origin || "",
        host: origin.originBaseUrl.match(/\.(\S+)\.com/)?.[1] || "",
      }));

      groups.push({ mainWiki, origins });
    }

    return groups;
  } catch (error) {
    console.error("Failed to fetch independent wikis:", error);
    return [];
  }
}
