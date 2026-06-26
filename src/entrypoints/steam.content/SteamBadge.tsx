import { useCallback, useEffect, useState } from "react";

import Logo from "~/components/Logo";
import { reportWikis } from "~/backend/messaging/wikis";
import { extractSteamUrlAppIdAndName } from "~/lib/url";
import WikipediaLink from "~/components/wikis/WikipediaLink";
import SteamDbLink from "~/components/wikis/SteamDbLink";
import IndependentWikiLinks from "~/components/wikis/IndependentWikiLinks";

function SteamBadge() {
  const [wikisFoundNum, setWikisFoundNum] = useState<number>(0);
  const [appData, setAppData] =
    useState<ReturnType<typeof extractSteamUrlAppIdAndName>>(null);

  const wikisNumIncrement = useCallback(() => {
    setWikisFoundNum((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const data = extractSteamUrlAppIdAndName();
    if (!data) return;
    setAppData(data);
  }, []);

  useEffect(() => {
    if (!appData) return;
    reportWikis({
      appId: appData.appId,
      appName: appData.name,
      source: "steam",
      wikisFoundNum,
    });
  }, [appData, wikisFoundNum]);

  if (!appData) return null;

  return (
    <div
      id={`wikie-badge-container-${appData.appId}`}
      className="wikie-badge-container"
    >
      <div>
        <Logo className="logo" /> <span className="app-name">{appData.name}</span>{" "}
        <span className="wikis">wikis ({wikisFoundNum}):</span>
        <div className="base-wikis-container">
          <SteamDbLink incrementWikisNum={wikisNumIncrement} appId={appData.appId} />
          <WikipediaLink
            steamGameName={appData.name}
            steamGameId={appData.appId}
            incrementWikisNum={wikisNumIncrement}
          />
        </div>
      </div>
      <IndependentWikiLinks
        appName={appData.name}
        incrementWikisNum={wikisNumIncrement}
      />
    </div>
  );
}

export default SteamBadge;
