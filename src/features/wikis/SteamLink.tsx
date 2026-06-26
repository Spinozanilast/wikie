import { WikiLinkComponent } from "~/lib/utils";
import { SiSteam } from "@icons-pack/react-simple-icons";

type SteamLinkProps = {
  appId: string;
} & WikiLinkComponent;

function SteamLink({ appId, incrementWikisNum }: SteamLinkProps) {
  useEffect(() => {
    incrementWikisNum();
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
