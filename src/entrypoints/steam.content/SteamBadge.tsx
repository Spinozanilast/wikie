import SteamRelatedBadge from "~/features/badges/SteamRelatedBadge";
import { type DisplayMode } from "~/backend/settings/settings";
import type { GameWikiData } from "~/backend/wikis/gameWikiData";

type SteamBadgeProps = {
  wikiData: GameWikiData;
  displayMode: DisplayMode;
};

function SteamBadge({ wikiData, displayMode }: SteamBadgeProps) {
  return (
    <SteamRelatedBadge
      badgeFor="steam"
      wikiData={wikiData}
      displayMode={displayMode}
    />
  );
}

export default SteamBadge;
