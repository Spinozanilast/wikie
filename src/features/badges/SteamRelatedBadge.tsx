import Logo from "~/components/Logo";
import SteamLink from "~/features/wikis/SteamLink";
import WikipediaLink from "~/features/wikis/WikipediaLink";
import IndependentWikiLinks from "~/features/wikis/IndependentWikiLinks";
import SteamDbLink from "~/features/wikis/SteamDbLink";

type SteamBadgeProps = {
  appId: string;
  appName: string;
  wikisFoundNum: number;
  wikisNumIncrement: () => void;
  badgeFor: "steam" | "steamdb";
};

function SteamRelatedBadge({
  appId,
  appName,
  wikisFoundNum,
  wikisNumIncrement,
  badgeFor,
}: SteamBadgeProps) {
  return (
    <div id={`wikie-badge-container-${appId}`} className="wikie-badge-container">
      <div>
        <Logo className="logo" /> <span className="app-name">{appName}</span>{" "}
        <span className="wikis">wikis ({wikisFoundNum}):</span>
        <div className="base-wikis-container">
          {badgeFor === "steam" ? (
            <SteamLink incrementWikisNum={wikisNumIncrement} appId={appId} />
          ) : (
            <SteamDbLink incrementWikisNum={wikisNumIncrement} appId={appId} />
          )}
          <WikipediaLink
            steamGameName={appName}
            steamGameId={appId}
            incrementWikisNum={wikisNumIncrement}
          />
        </div>
      </div>
      <IndependentWikiLinks appName={appName} incrementWikisNum={wikisNumIncrement} />
    </div>
  );
}

export default SteamRelatedBadge;
