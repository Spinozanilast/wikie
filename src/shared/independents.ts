import { storage } from "@wxt-dev/storage";

type WikiCollectionType = Map<string, IndependentWiki>;

type Origin = {
  origin: string;
  originBaseUrl: string;
  originContentPath: string;
  originWebPageUrl: string;
};

export type IndependentWiki = {
  originsLabel: string;
  origins: Origin[];

  destination: string;
  destinationBaseUrl: string;
  destinationPlatform: string;
  destinationMainPage: string;
  destinationSearchPath: string;
  destinationContentPath: string;
  destinationHost: string;
  tags: string[];
};

export class IndependentWikisCollection {
  private static _wikis: WikiCollectionType = new Map();

  static async prefetch(url: string): Promise<void> {
    const response = await fetch(url);
    const json = await response.json();

    for (const entry of json) {
      const wiki: IndependentWiki = {
        originsLabel: entry.origins_label,
        origins: entry.origins.map((origin: any) => ({
          origin: origin.origin,
          originBaseUrl: origin.origin_base_url,
          originContentPath: origin.origin_content_path,
          originWebPageUrl: `https://${origin.origin_base_url}`,
        })),
        destination: entry.destination,
        destinationBaseUrl: entry.destination_base_url,
        destinationPlatform: entry.destination_platform,
        destinationMainPage: entry.destination_main_page,
        destinationSearchPath: entry.destination_search_path,
        destinationContentPath: entry.destination_content_path,
        destinationHost: entry.destination_host,
        tags: entry.tags ?? [],
      };
      this._wikis.set(entry.id, wiki);
    }
  }

  static getCollection(): Map<string, IndependentWiki> {
    return this._wikis;
  }
}

export const independentWikisItem = storage.defineItem<WikiCollectionType>(
  "local:independents",
  {
    fallback: new Map(),
  },
);
