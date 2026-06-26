import { useCallback, useEffect, useState } from "react";
import { extractSteamUrlAppId } from "~/lib/url";

import { reportWikis } from "~/backend/messaging/wikis";
import SteamRelatedBadge from "~/features/badges/SteamRelatedBadge";

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
    <SteamRelatedBadge
      appId={appId}
      appName={appName}
      wikisFoundNum={wikisFoundNum}
      wikisNumIncrement={wikisNumIncrement}
      badgeFor="steamdb"
    />
  );
}

export default SteamDbBadge;
