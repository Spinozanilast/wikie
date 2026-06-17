import { useEffect, useState } from "react";
import { extractSteamAppIdAndName } from "~/lib/steam";
import { SiWikipedia, SiReactHex, SiReact } from "@icons-pack/react-simple-icons";
import Logo from "~/components/Logo";

function SteamBadge() {
  const [appData, setAppData] =
    useState<ReturnType<typeof extractSteamAppIdAndName>>(null);
  const [searchUrl, setSearchUrl] = useState<string | null>("");

  useEffect(() => {
    const data = extractSteamAppIdAndName();
    if (!data) return;

    setAppData(data);

    const gameUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(data.name)}`;
    const checkDisambiguationUrl = `${gameUrl}_(disambiguation)`;

    fetch(checkDisambiguationUrl)
      .then((response) => {
        if (response.ok) {
          setSearchUrl(`${gameUrl}_(video_game)`);
        } else {
          fetch(gameUrl)
            .then((response) => {
              if (response.ok) {
                setSearchUrl(gameUrl);
              } else {
                setSearchUrl(null);
              }
            })
            .catch((error) => {
              console.error(error);
              setSearchUrl(
                `https://en.wikipedia.org/wiki/${encodeURIComponent(data.name)}`,
              );
            });
        }

        return response.text();
      })
      .catch((error) => {
        console.error(error);
        setSearchUrl(null);
      });
  }, []);

  if (!appData) return null;

  return (
    <div
      id={`wikie-badge-container-${appData.appId}`}
      className="wikie-badge-container"
    >
      <Logo className="logo" /> <span className="app-name">{appData.name}</span>{" "}
      <span className="wikis">wikis:</span>
      <a
        id={`wikie-wikipedia-${appData.appId}`}
        className="wikie-wikipedia-badge"
        href={
          searchUrl ||
          `https://en.wikipedia.org/wiki/${encodeURIComponent(appData.name)}`
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiWikipedia className="logo" id="wikipedia" />
      </a>
    </div>
  );
}

export default SteamBadge;
