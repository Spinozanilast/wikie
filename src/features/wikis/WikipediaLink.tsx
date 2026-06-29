import { SiWikipedia } from "@icons-pack/react-simple-icons";
import { WikiLinkComponentProps } from "./types";

function WikipediaLink({ appId, url, otherClass }: WikiLinkComponentProps) {
  if (!url) return null;

  return (
    <a
      id={`wikie-wikipedia-${appId}`}
      className={otherClass ? otherClass : "wikie-badge wikipedia"}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Wikipedia"
    >
      <SiWikipedia className="logo" id="wikipedia" />
    </a>
  );
}

export default WikipediaLink;
