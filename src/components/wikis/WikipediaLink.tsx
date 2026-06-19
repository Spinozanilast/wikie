import { useEffect, useState } from "react";
import { SiWikipedia } from "@icons-pack/react-simple-icons";

type WikipediaLinkProps = {
  steamGameName: string;
  steamGameId: string;
  wikisNumIncrement: () => void;
};

function WikipediaLink({
  steamGameName,
  steamGameId,
  wikisNumIncrement,
}: WikipediaLinkProps) {
  const [searchUrl, setSearchUrl] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const gameUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(steamGameName)}`;

    const searchCompleteSuccessAction = () => {
      wikisNumIncrement();
      setIsLoading(false);
    };

    /**
     * Check for postfixed game page url
     * if it exists, redirect to the page postfixed with _(video_game)
     * otherwise, redirect to the regular game page if it exists
     * for cases, where there are multiple pages with the same name
     */
    const postfixedGamePageUrl = `${gameUrl}_(video_game)`;

    const getWikipediaPage = async () => {
      const response = await fetch(postfixedGamePageUrl);
      if (response.ok) {
        setSearchUrl(postfixedGamePageUrl);
        searchCompleteSuccessAction();
        setIsLoading(false);
        return;
      } else {
        const gameResponse = await fetch(gameUrl);
        // then we check if the game page exists at all
        if (gameResponse.ok) {
          setSearchUrl(gameUrl);
          searchCompleteSuccessAction();
          return;
        } else {
          setSearchUrl(null);
        }
      }

      // last chance: search for the game name in the wikipedia search api
      const searchUrl = `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${encodeURIComponent(`${steamGameName}`)}&limit=5&cirrusUserTesting=T407432_dym_g_ld:control`;
      const searchResponse = await fetch(searchUrl);
      if (searchResponse.ok) {
        const data = await searchResponse.json();
        if (data.pages.length > 0) {
          for (const page of data.pages) {
            if ((page.description as string).includes("video game")) {
              setSearchUrl(
                `https://en.wikipedia.org/wiki/${encodeURIComponent(page.excerpt)}`,
              );
              searchCompleteSuccessAction();
              return;
            }
          }
          return;
        }
      }

      setSearchUrl(null);
      setIsLoading(false);
    };

    getWikipediaPage();
  }, []);

  if (isLoading) {
    return <div className="wikie-wikipedia-badge loading-wiki" />;
  }

  if (!searchUrl) return null;

  return (
    <a
      id={`wikie-wikipedia-${steamGameId}`}
      className="wikie-badge wikipedia"
      href={
        searchUrl ||
        `https://en.wikipedia.org/wiki/${encodeURIComponent(steamGameName)}`
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      <SiWikipedia className="logo" id="wikipedia" />
    </a>
  );
}

export default WikipediaLink;
