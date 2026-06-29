import { SiSteamdb } from "@icons-pack/react-simple-icons";

type SteamDbLinkProps = {
  appId: string;
  url: string;
  otherClass?: string;
};

function SteamDbLink({ appId, url, otherClass }: SteamDbLinkProps) {
  return (
    <a
      id={`wikie-steamdb-${appId}`}
      className={otherClass ? `${otherClass}` : "wikie-badge steamdb"}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="SteamDB"
    >
      <SiSteamdb className="logo" id="steamdb" />
    </a>
  );
}

export default SteamDbLink;
