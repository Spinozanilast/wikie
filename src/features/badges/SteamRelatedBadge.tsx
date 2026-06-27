import Logo from "~/components/Logo";

import SteamLink from "~/features/wikis/SteamLink";
import WikipediaLink from "~/features/wikis/WikipediaLink";
import IndependentWikiLinks from "~/features/wikis/IndependentWikiLinks";
import SteamDbLink from "~/features/wikis/SteamDbLink";

import { useAppWikis } from "~/contexts/WikisContext";

type SteamBadgeProps = {
  badgeFor: "steam" | "steamdb";
};

function SteamRelatedBadge({ badgeFor }: SteamBadgeProps) {
  const { appId, appName, wikisCount } = useAppWikis();
  return (
    <div id={`wikie-badge-container-${appId}`} className="wikie-badge-container">
      <div>
        <Logo className="logo" /> <span className="app-name">{appName}</span>{" "}
        <span className="wikis">wikis ({wikisCount}):</span>
        <div className="base-wikis-container">
          {badgeFor === "steam" ? <SteamDbLink /> : <SteamLink />}
          <WikipediaLink />
        </div>
      </div>
      <IndependentWikiLinks />
    </div>
  );
}

export default SteamRelatedBadge;
