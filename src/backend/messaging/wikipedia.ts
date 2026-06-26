import { sendMessage as contentScriptSendMessage } from "webext-bridge/content-script";
import type { Destination } from "webext-bridge";

export type WikipediaSearchResult = {
  url: string;
};

export enum WikipediaMessages {
  SearchPage = "WIKIPEDIA_SEARCH_PAGE",
}

export function searchWikipediaPage(
  gameName: string,
  destination: Destination = "background",
) {
  return contentScriptSendMessage<{ url: string | null }>(
    WikipediaMessages.SearchPage,
    { gameName },
    destination,
  );
}

/**
 * Searches for a Wikipedia page for the given game name.
 * @param gameName Game name to search for.
 * @returns A promise that resolves to the search result, or `null` if no page was found.
 */
export async function searchWikipediaPageHandler(
  gameName: string,
): Promise<{ url: string | null }> {
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
}
