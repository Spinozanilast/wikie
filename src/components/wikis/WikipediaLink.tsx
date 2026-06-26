import { useEffect, useState } from "react";
import { WikiLinkComponent } from "~/shared/wikis";
import { searchWikipediaPage } from "~/lib/messaging/wikis";
import { SiWikipedia } from "@icons-pack/react-simple-icons";

type WikipediaLinkProps = {
  steamGameName: string;
  steamGameId: string;
} & WikiLinkComponent;

function WikipediaLink({
  steamGameName,
  steamGameId,
  incrementWikisNum: wikisNumIncrement,
}: WikipediaLinkProps) {
  const [searchUrl, setSearchUrl] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const getWikipediaPage = async () => {
      try {
        const { url } = await searchWikipediaPage(steamGameName);
        if (url) {
          setSearchUrl(url);
          wikisNumIncrement();
        } else {
          setSearchUrl(null);
        }
      } catch {
        setSearchUrl(null);
      }
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
