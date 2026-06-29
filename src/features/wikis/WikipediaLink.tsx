import { SiWikipedia } from "@icons-pack/react-simple-icons";

type WikipediaLinkProps = {
  appId: string;
  wikipediaUrl: string | null;
  otherClass?: string;
};

function WikipediaLink({ appId, wikipediaUrl, otherClass }: WikipediaLinkProps) {
  if (!wikipediaUrl) return null;

  return (
    <a
      id={`wikie-wikipedia-${appId}`}
      className={otherClass ? otherClass : "wikie-badge wikipedia"}
      href={wikipediaUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Wikipedia"
    >
      <SiWikipedia className="logo" id="wikipedia" />
    </a>
  );
}

export default WikipediaLink;
