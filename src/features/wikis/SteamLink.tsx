import { SiSteam } from "@icons-pack/react-simple-icons";

type SteamLinkProps = {
  appId: string;
  url: string;
};

function SteamLink({ appId, url }: SteamLinkProps) {
  return (
    <a
      id={`wikie-steamdb-${appId}`}
      className="wikie-badge steamdb"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <SiSteam className="logo" id="steamdb" />
    </a>
  );
}

export default SteamLink;
