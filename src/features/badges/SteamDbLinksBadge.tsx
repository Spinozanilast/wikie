import { GameWikiData } from "~/backend/wikis/gameWikiData";
import SteamDbLink from "~/features/wikis/SteamDbLink";
import WikipediaLink from "~/features/wikis/WikipediaLink";
import SteamLink from "~/features/wikis/SteamLink";
import { getHostIcon, Host } from "~/features/wikis/IndependentWikiLinks";

type WikisLinksProps = {
  badgeFor: "steam" | "steamdb";
  wikiData: GameWikiData;
};

function SteaemDbLinksBadge({ wikiData, badgeFor }: WikisLinksProps) {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      <WikipediaLink
        appId={wikiData.appId}
        wikipediaUrl={wikiData.wikipediaUrl}
        otherClass="btn tooltipped tooltipped-n"
      />
      {wikiData.independentGroups.map((group, idx) => (
        <>
          <a
            className="btn tooltipped tooltipped-n"
            href={group.mainWiki.url}
            aria-label={group.mainWiki.title}
            target="_blank"
            rel="noopener noreferrer"
            key={idx}
          >
            {getHostIcon(group.mainWiki.host as Host)}
          </a>
          {group.origins.map((origin, idx) => (
            <a
              className="btn tooltipped tooltipped-n"
              href={origin.url}
              aria-label={origin.title}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
            >
              {getHostIcon(origin.host as Host)}
            </a>
          ))}
        </>
      ))}
    </div>
  );
}

export default SteaemDbLinksBadge;
