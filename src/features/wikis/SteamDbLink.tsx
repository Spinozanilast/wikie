import { WikiLinkComponent } from "~/lib/utils";
import { SiSteamdb } from "@icons-pack/react-simple-icons";

type SteamDbLinkProps = {
  appId: string;
} & WikiLinkComponent;

function SteamDbLink({ appId, incrementWikisNum }: SteamDbLinkProps) {
  useEffect(() => {
    incrementWikisNum();
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
