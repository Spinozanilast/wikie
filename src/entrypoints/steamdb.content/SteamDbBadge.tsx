import { useEffect } from "react";

import { extractSteamUrlAppId } from "~/lib/url";
import { reportWikis } from "~/backend/messaging/wikis";
import { useAppWikis } from "~/contexts/WikisContext";
import SteamRelatedBadge from "~/features/badges/SteamRelatedBadge";

type SteamDbBadgeProps = {
  appName: string;
};

function SteamDbBadge({ appName }: SteamDbBadgeProps) {
  const { appId, getWikis, wikisCount, setAppInfo } = useAppWikis();

  useEffect(() => {
    const appId = extractSteamUrlAppId();
    if (!appId) return;
    setAppInfo(appId, appName);
  }, [appName]);

  useEffect(() => {
    if (!appId) return;
    reportWikis({
      appId,
      appName,
      source: "steamdb",
      wikisFoundCount: wikisCount,
      wikis: getWikis(),
    });
  }, [appId, appName, wikisCount]);

  if (!appId) return null;

  return <SteamRelatedBadge badgeFor="steamdb" />;
}

export default SteamDbBadge;
