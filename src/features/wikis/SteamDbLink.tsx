import { SiSteamdb } from "@icons-pack/react-simple-icons";
import { ImmediateWikiLinkComponentProps } from "./types";

function SteamDbLink({ appId, url, otherClass }: ImmediateWikiLinkComponentProps) {
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
