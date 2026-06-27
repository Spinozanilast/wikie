import { SiSteamdb } from "@icons-pack/react-simple-icons";

import { WikisHosts } from "~/lib/hosts";
import { useAppWikis } from "~/contexts/WikisContext";

function SteamDbLink() {
  const { appId, addWiki } = useAppWikis();

  useEffect(() => {
    addWiki({
      title: "SteamDB",
      host: WikisHosts.SteamDB,
      url: `https://steamdb.info/app/${appId}/charts`,
    });
  }, []);

  return (
    <a
      id={`wikie-steamdb-${appId}`}
      className="wikie-badge steamdb"
      href={`https://steamdb.info/app/${appId}/charts`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <SiSteamdb className="logo" id="steamdb" />
    </a>
  );
}

export default SteamDbLink;
