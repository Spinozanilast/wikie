import { useCallback, useEffect, useState } from "react";

import { reportWikis } from "~/backend/messaging/wikis";
import { extractSteamUrlAppIdAndName } from "~/lib/url";
import SteamRelatedBadge from "~/features/badges/SteamRelatedBadge";

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
    <SteamRelatedBadge
      appId={appData.appId}
      appName={appData.name}
      wikisFoundNum={wikisFoundNum}
      wikisNumIncrement={wikisNumIncrement}
      badgeFor="steam"
    />
  );
}

export default SteamBadge;
