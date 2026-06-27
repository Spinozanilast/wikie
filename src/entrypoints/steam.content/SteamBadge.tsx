import { useEffect } from "react";

import { extractSteamUrlAppIdAndName } from "~/lib/url";
import { reportWikis } from "~/backend/messaging/wikis";
import { useAppWikis } from "~/contexts/WikisContext";
import SteamRelatedBadge from "~/features/badges/SteamRelatedBadge";

function SteamBadge() {
  const { appId, appName, getWikis, wikisCount, setAppInfo } = useAppWikis();

  useEffect(() => {
    const data = extractSteamUrlAppIdAndName();
    if (!data) return;
    setAppInfo(data.appId, data.name);
  }, []);

  useEffect(() => {
    if (!appId) return;
    reportWikis({
      appId,
      appName,
      source: "steam",
      wikisFoundCount: wikisCount,
      wikis: getWikis(),
    });
  }, [appId, appName, wikisCount]);

  if (!appId) return null;

  return <SteamRelatedBadge badgeFor="steam" />;
}

export default SteamBadge;
