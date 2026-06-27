import { independentWikisItem } from "~/backend/wikis/independents";
import {
  SiFandom,
  SiFandomHex,
  SiWikidotgg,
  SiWikidotggHex,
} from "@icons-pack/react-simple-icons";
import { CheckFatIcon } from "@phosphor-icons/react/dist/csr/CheckFat";
import { useAppWikis } from "@/contexts/WikisContext";

type WikiInfo = {
  url: string;
  title: string;
  host: string;
};

type WikiGroup = {
  mainWiki: WikiInfo;
  origins: WikiInfo[];
};

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

function IndependentWikiLinks() {
  const { appName, addWiki } = useAppWikis();
  const appNameProcessed = useMemo(() => appName.replace(" ", "").toLowerCase(), []);

  const [wikiGroups, setWikiGroups] = useState<WikiGroup[]>([]);

  useEffect(() => {
    const populateData = async () => {
      try {
        const collection = await independentWikisItem.getValue();
        if (!collection || (collection && Object.keys(collection).length === 0)) return;

        const gameEntriesKeys = Object.keys(collection).filter((key) =>
          key.startsWith(`en-${appNameProcessed}`),
        );

        const wikiEntries = gameEntriesKeys.map((key) => collection[key]);
        const foundedWikiGroups: WikiGroup[] = [];

        for (const wikiEntry of wikiEntries) {
          if (!wikiEntry) return;
          const newWikiGroup: WikiGroup = {
            mainWiki: {
              url: `https://${wikiEntry?.destinationBaseUrl}`,
              title: wikiEntry?.originsLabel || "",
              host: wikiEntry?.destinationHost || "",
            },
            origins: [],
          };
          addWiki(newWikiGroup.mainWiki);

          if (wikiEntry.origins.length !== 0) {
            wikiEntry.origins.forEach((origin) => {
              const originWiki = {
                url: `https://${origin?.originBaseUrl}`,
                title: origin?.origin || "",
                host: origin?.originBaseUrl.match(/\.(\S+)\.com/)?.[1] || "",
              };

              addWiki(originWiki);
              newWikiGroup.origins.push(originWiki);
            });
          }

          foundedWikiGroups.push(newWikiGroup);
        }

        setWikiGroups(foundedWikiGroups);
      } catch (error) {
        console.error(error);
      }
    };

    populateData();
  }, []);

  if (wikiGroups?.length === 0) return null;

  return (
    <div id={`wikis-${appName}`} className="independent-wiki-links">
      {wikiGroups.map((wikiGroup, index) => (
        <div key={index} className="wiki-group-container">
          <h1>{wikiGroup.mainWiki.title}s:</h1>
          <div>
            <a
              title={`${wikiGroup.mainWiki.title} (main)`}
              href={wikiGroup.mainWiki.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {getHostIcon(wikiGroup.mainWiki.host as Host)}
            </a>
            <div className="origins-container">
              {wikiGroup.origins.map((origin, originIndex) => (
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
  );
}

export default IndependentWikiLinks;
