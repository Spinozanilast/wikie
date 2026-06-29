import { SiSteamdb } from "@icons-pack/react-simple-icons";

type SteamDbLinkProps = {
  appId: string;
  url: string;
};

function SteamDbLink({ appId, url }: SteamDbLinkProps) {
  return (
    <a
      id={`wikie-steamdb-${appId}`}
      className="wikie-badge steamdb"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <SiSteamdb className="logo" id="steamdb" />
    </a>
  );
}

export default SteamDbLink;
