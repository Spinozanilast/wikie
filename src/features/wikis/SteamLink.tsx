import { SiSteam } from "@icons-pack/react-simple-icons";

type SteamLinkProps = {
  appId: string;
  url: string;
  otherClass?: string;
};

function SteamLink({ appId, url, otherClass }: SteamLinkProps) {
  return (
    <a
      id={`wikie-steamdb-${appId}`}
      className={otherClass ? `${otherClass}` : "wikie-badge steamdb"}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Steam"
    >
      <SiSteam className="logo" id="steam" />
    </a>
  );
}

export default SteamLink;
