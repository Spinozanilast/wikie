import { useEffect, useState } from "react";

import {
  openWikisPagesItem,
  switchToTab,
  type OpenWikiPage,
} from "~/backend/messaging/wikis";

import TitleBar from "~/components/TitleBar";
import WikiPreviewLink from "./WikiPreviewLink";

import { SiSteam, SiSteamdb } from "@icons-pack/react-simple-icons";
import { GearSixIcon } from "@phosphor-icons/react/dist/csr/GearSix";

function OpenWikisList() {
  const [openWikis, setOpenWikis] = useState<OpenWikiPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    openWikisPagesItem.getValue().then((wikis) => {
      setOpenWikis(wikis);
      setIsLoading(false);
    });

    const unwatch = openWikisPagesItem.watch((newWikis) => {
      setOpenWikis(newWikis);
    });

    return () => unwatch();
  }, []);

  if (isLoading) return null;

  if (openWikis.length === 0) {
    return (
      <p className="mt-8 text-sm opacity-60">
        No open wiki pages. Visit a Steam or SteamDB game page.
      </p>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-md mb-2">Open wiki pages:</p>
      {openWikis.map((wiki) => (
        <div
          className="border-tertiary/80 flex flex-col rounded-2xl border p-1"
          key={wiki.tabId}
        >
          <div className="border-tertiary/50 bg-secondary/10 rounded-2xls flex items-center gap-3 border-2 px-3 py-2 text-left transition-colors">
            <div className="flex shrink-0 items-center gap-1">
              {wiki.source === "steam" ? (
                <SiSteam size={20} />
              ) : (
                <SiSteamdb size={20} />
              )}
            </div>
            <span className="flex-1 truncate text-sm">{wiki.appName}</span>
            <span
              className="bg-tertiary text-background rounded-md px-2 py-0.5 text-xs font-bold"
              title={`${wiki.wikisFoundCount} wiki${wiki.wikisFoundCount !== 1 ? "s" : ""}`}
            >
              {wiki.wikisFoundCount}
            </span>
            <button
              onClick={() => switchToTab(wiki.tabId)}
              className="font-departure text-tertiary cursor-pointer text-xl hover:scale-110"
              title={`Go to tab ${wiki.tabId} (${wiki.appName})`}
            >
              →
            </button>
          </div>
          {wiki.wikis && (
            <div className="flex flex-wrap items-center justify-center gap-2 p-2">
              {wiki.wikis.map((wiki, idx) => (
                <WikiPreviewLink key={idx} wiki={wiki} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

type MainScreenProps = {
  openSettingPage: () => void;
};

function MainView({ openSettingPage }: MainScreenProps) {
  return (
    <div className="font-pixelify min-h-120 w-full">
      <TitleBar />
      <OpenWikisList />
      <div className="fixed bottom-0 flex h-10 w-full items-center justify-start">
        <button className="btn" onClick={() => openSettingPage()}>
          <GearSixIcon className="w-8" />
        </button>
      </div>
    </div>
  );
}

export default MainView;
