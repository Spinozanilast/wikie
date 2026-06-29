import Logo from "~/components/Logo";

import SteamLink from "~/features/wikis/SteamLink";
import WikipediaLink from "~/features/wikis/WikipediaLink";
import IndependentWikiLinks from "~/features/wikis/IndependentWikiLinks";
import SteamDbLink from "~/features/wikis/SteamDbLink";

import { DisplayMode } from "~/backend/settings/settings";
import type { GameWikiData } from "~/backend/wikis/gameWikiData";

type SteamBadgeProps = {
  badgeFor: "steam" | "steamdb";
  wikiData: GameWikiData;
  displayMode: DisplayMode;
};

function SteamRelatedBadge({ badgeFor, wikiData, displayMode }: SteamBadgeProps) {
  if (displayMode === "inline") {
    return (
      <div id={`wikie-badge-inline-container-${wikiData.appId}`} className="wikie-inline-badge">
        <div className="base-wikis-container">
          {badgeFor === "steam" ? (
            <SteamDbLink appId={wikiData.appId} url={wikiData.steamDbUrl} />
          ) : (
            <SteamLink appId={wikiData.appId} url={wikiData.steamUrl} />
          )}
          <WikipediaLink appId={wikiData.appId} wikipediaUrl={wikiData.wikipediaUrl} />
        </div>
        <IndependentWikiLinks
          appName={wikiData.appName}
          groups={wikiData.independentGroups}
          renderAsMinified
        />
      </div>
    );
  }

  return (
    <div id={`wikie-badge-container-${wikiData.appId}`} className="wikie-badge-container">
      <div>
        <Logo className="logo" /> <span className="app-name">{wikiData.appName}</span>{" "}
        <span className="wikis">wikis ({wikiData.wikis.length}):</span>
        <div className="base-wikis-container">
          {badgeFor === "steam" ? (
            <SteamDbLink appId={wikiData.appId} url={wikiData.steamDbUrl} />
          ) : (
            <SteamLink appId={wikiData.appId} url={wikiData.steamUrl} />
          )}
          <WikipediaLink appId={wikiData.appId} wikipediaUrl={wikiData.wikipediaUrl} />
        </div>
      </div>
      <IndependentWikiLinks
        appName={wikiData.appName}
        groups={wikiData.independentGroups}
        renderAsMinified={false}
      />
    </div>
  );
}

export default SteamRelatedBadge;
