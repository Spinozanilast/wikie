import { SiWikipedia } from "@icons-pack/react-simple-icons";

type WikipediaLinkProps = {
  appId: string;
  wikipediaUrl: string | null;
};

function WikipediaLink({ appId, wikipediaUrl }: WikipediaLinkProps) {
  if (!wikipediaUrl) return null;

  return (
    <a
      id={`wikie-wikipedia-${appId}`}
      className="wikie-badge wikipedia"
      href={wikipediaUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <SiWikipedia className="logo" id="wikipedia" />
    </a>
  );
}

export default WikipediaLink;
