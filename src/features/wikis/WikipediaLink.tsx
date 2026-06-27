import { useEffect, useState } from "react";
import { searchWikipediaPage } from "~/backend/messaging/wikipedia";
import { SiWikipedia } from "@icons-pack/react-simple-icons";
import { useAppWikis } from "~/contexts/WikisContext";
import { WikisHosts } from "~/lib/hosts";

function WikipediaLink() {
  const { appName, appId, addWiki } = useAppWikis();
  const [searchUrl, setSearchUrl] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const getWikipediaPage = async () => {
      try {
        const { url } = await searchWikipediaPage(appName);
        if (url) {
          setSearchUrl(url);
          addWiki({
            host: WikisHosts.Wikipedia,
            title: "Wikipedia game page",
            url,
          });
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
      id={`wikie-wikipedia-${appId}`}
      className="wikie-badge wikipedia"
      href={searchUrl || `https://en.wikipedia.org/wiki/${encodeURIComponent(appName)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <SiWikipedia className="logo" id="wikipedia" />
    </a>
  );
}

export default WikipediaLink;
