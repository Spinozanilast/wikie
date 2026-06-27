import { WikisHosts } from "~/lib/hosts";
import { SiSteam } from "@icons-pack/react-simple-icons";

import { useAppWikis } from "~/contexts/WikisContext";

function SteamLink() {
  const { appId, addWiki } = useAppWikis();

  useEffect(() => {
    addWiki({
      title: "Steam",
      host: WikisHosts.Steam,
      url: `https://store.steampowered.com/app/${appId}/`,
    });
  }, []);

  return (
    <a
      id={`wikie-steamdb-${appId}`}
      className="wikie-badge steamdb"
      href={`https://store.steampowered.com/app/${appId}/`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <SiSteam className="logo" id="steamdb" />
    </a>
  );
}

export default SteamLink;
