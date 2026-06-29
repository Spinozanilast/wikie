import { type DisplayMode } from "~/backend/settings/settings";
import SteamRelatedBadge from "~/features/badges/SteamRelatedBadge";
import type { GameWikiData } from "~/backend/wikis/gameWikiData";

type SteamDbBadgeProps = {
  wikiData: GameWikiData;
  displayMode: DisplayMode;
};

function SteamDbBadge({ wikiData, displayMode }: SteamDbBadgeProps) {
  return (
    <SteamRelatedBadge
      badgeFor="steamdb"
      wikiData={wikiData}
      displayMode={displayMode}
    />
  );
}

export default SteamDbBadge;
