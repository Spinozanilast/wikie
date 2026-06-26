import { useCallback, useEffect, useState } from "react";
import { extractSteamUrlAppId } from "~/lib/url";

import Logo from "~/components/Logo";
import { reportWikis } from "~/lib/messaging/wikis";
import WikipediaLink from "~/components/wikis/WikipediaLink";
import SteamLink from "~/components/wikis/SteamLink";

type SteamDbBadgeProps = {
  appName: string;
};

function SteamDbBadge({ appName }: SteamDbBadgeProps) {
  const [wikisFoundNum, setWikisFoundNum] = useState<number>(0);
  const [appId, setAppId] = useState<ReturnType<typeof extractSteamUrlAppId>>(null);

  const wikisNumIncrement = useCallback(() => {
    setWikisFoundNum((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const appId = extractSteamUrlAppId();
    if (!appId) return;
    setAppId(appId);
  }, []);

  useEffect(() => {
    if (!appId) return;
    reportWikis({
      appId,
      appName,
      source: "steamdb",
      wikisFoundNum,
    });
  }, [appId, appName, wikisFoundNum]);

  if (!appId) return null;

  return (
    <div id={`wikie-badge-container-${appId}`} className="wikie-badge-container">
      <div>
        <Logo className="logo" /> <span className="app-name">{appName}</span>{" "}
        <span className="wikis">wikis ({wikisFoundNum}):</span>
        <div className="base-wikis-container">
          <SteamLink incrementWikisNum={wikisNumIncrement} appId={appId} />
          <WikipediaLink
            steamGameName={appName}
            steamGameId={appId}
            incrementWikisNum={wikisNumIncrement}
          />
        </div>
      </div>
    </div>
  );
}

export default SteamDbBadge;
