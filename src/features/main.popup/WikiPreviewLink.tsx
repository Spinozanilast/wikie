import {
  SiSteam,
  SiSteamdb,
  SiWikipedia,
  SiWikidotgg,
  SiFandom,
} from "@icons-pack/react-simple-icons";
import { CheckFatIcon } from "@phosphor-icons/react";
import { WikiInfo } from "~/backend/messaging/wikis";
import { WikisHosts } from "~/lib/hosts";

function getIconByHost(host: WikisHosts | string) {
  switch (host) {
    case WikisHosts.Steam:
      return SiSteam;
    case WikisHosts.SteamDB:
      return SiSteamdb;
    case WikisHosts.Wikipedia:
      return SiWikipedia;
    case WikisHosts.WikiGG:
      return SiWikidotgg;
    case WikisHosts.Fandom:
      return SiFandom;
    default:
      return null;
  }
}

function WikiPreviewLink({ wiki }: { wiki: WikiInfo }) {
  const Icon = getIconByHost(wiki.host);

  return (
    <a
      className="wikie-badge"
      href={wiki.url}
      target="_blank"
      rel="noopener noreferrer"
      title={wiki.title}
    >
      {Icon ? (
        <Icon className="fill-tertiary h-6 w-6" />
      ) : (
        <CheckFatIcon className="fill-tertiary h-6 w-6" />
      )}
    </a>
  );
}

export default WikiPreviewLink;
