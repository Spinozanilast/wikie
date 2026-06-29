import {
  SiFandom,
  SiFandomHex,
  SiWikidotgg,
  SiWikidotggHex,
} from "@icons-pack/react-simple-icons";
import { CheckFatIcon } from "@phosphor-icons/react/dist/csr/CheckFat";
import type { IndependentWikiGroup } from "~/backend/wikis/gameWikiData";

type Host = "wiki.gg" | "fandom";

function getHostIcon(host: Host, size: number = 24) {
  switch (host) {
    case "wiki.gg":
      return <SiWikidotgg size={size} color={SiFandomHex} />;
    case "fandom":
      return <SiFandom size={size} color={SiWikidotggHex} />;
    default:
      return <CheckFatIcon size={size} />;
  }
}

type IndependentWikiLinksProps = {
  appName: string;
  groups: IndependentWikiGroup[];
  renderAsMinified: boolean;
};

function IndependentWikiLinks({
  appName,
  groups,
  renderAsMinified,
}: IndependentWikiLinksProps) {
  if (groups.length === 0) return null;

  const [firstGroup, ...restGroups] = groups;

  return (
    <>
      <div className="independent-wiki-first-group">
        <a
          className="wikie-badge"
          title={`${firstGroup.mainWiki.title} (independent official wiki)`}
          href={firstGroup.mainWiki.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {getHostIcon(firstGroup.mainWiki.host as Host)}
        </a>
        {firstGroup.origins.map((origin, idx) => {
          return (
            <a
              className="wikie-badge"
              title={`${origin.title} (origin)`}
              href={origin.url}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
            >
              {getHostIcon(origin.host as Host)}
            </a>
          );
        })}
      </div>
      {restGroups.length > 0 && (
        <div
          id={`wikis-${appName}`}
          className={
            renderAsMinified
              ? "independent-wiki-links-minified"
              : "independent-wiki-links"
          }
        >
          {restGroups.map((group, index) => (
            <div key={index} className="wiki-group-container">
              <h1>{group.mainWiki.title}s:</h1>
              <div>
                <a
                  title={`${group.mainWiki.title} (main)`}
                  href={group.mainWiki.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getHostIcon(group.mainWiki.host as Host)}
                </a>
                <div className="origins-container">
                  {group.origins.map((origin, originIndex) => (
                    <a
                      key={originIndex}
                      title={`${origin.title} (${origin.host})`}
                      href={origin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getHostIcon(origin.host as Host)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default IndependentWikiLinks;
