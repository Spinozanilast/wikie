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

  useEffect(() => {
    const gameUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(steamGameName)}`;

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
        wikisNumIncrement();
      } else {
        const gameResponse = await fetch(gameUrl);
        // then we check if the game page exists at all
        if (gameResponse.ok) {
          setSearchUrl(gameUrl);
          wikisNumIncrement();
        } else {
          setSearchUrl(null);
        }
      }
    };

    getWikipediaPage();
  }, []);

  if (!searchUrl) return null;

  return (
    <a
      id={`wikie-wikipedia-${steamGameId}`}
      className="wikie-wikipedia-badge"
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
