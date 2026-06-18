import { useCallback, useEffect, useState } from "react";
import { extractSteamAppIdAndName } from "~/lib/steam";

import Logo from "~/components/Logo";
import WikipediaLink from "~/components/wikis/WikipediaLink";

function SteamBadge() {
  const [wikisFoundNum, setWikisFoundNum] = useState<number>(0);
  const [appData, setAppData] =
    useState<ReturnType<typeof extractSteamAppIdAndName>>(null);

  const wikisNumIncrement = useCallback(() => {
    setWikisFoundNum((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const data = extractSteamAppIdAndName();
    if (!data) return;
    setAppData(data);
    console.log("data", data);
  }, []);

  if (!appData) return null;

  return (
    <div
      id={`wikie-badge-container-${appData.appId}`}
      className="wikie-badge-container"
    >
      <Logo className="logo" /> <span className="app-name">{appData.name}</span>{" "}
      <span className="wikis">wikis ({wikisFoundNum}):</span>
      <WikipediaLink
        steamGameName={appData.name}
        steamGameId={appData.appId}
        wikisNumIncrement={wikisNumIncrement}
      />
    </div>
  );
}

export default SteamBadge;
