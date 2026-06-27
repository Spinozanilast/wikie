import { storage } from "@wxt-dev/storage";
import { sendMessage as contentScriptSendMessage } from "webext-bridge/content-script";
import { sendMessage as popupSendMessage } from "webext-bridge/popup";
import type { Destination } from "webext-bridge";

export type WikiInfo = {
  url: string;
  host: string;
  title: string;
};

export interface OpenWikiPage {
  appId: string;
  appName: string;
  source: "steam" | "steamdb";
  wikisFoundCount: number;
  tabId: number;
  wikis: WikiInfo[];
}

export enum OpenWikisMessages {
  ReportWikis = "REPORT_WIKIS",
  SwitchToTab = "SWITCH_TO_TAB",
}

export const openWikisPagesItem = storage.defineItem<OpenWikiPage[]>(
  "local:openWikisPages",
  { fallback: [] },
);

/**
 * For content-script use tabs with wiki founded message sender wrapper
 * @param data Wiki page data to report
 * @param destination Destination to send the message to
 */
export function reportWikis(
  data: Omit<OpenWikiPage, "tabId">,
  destination: Destination = "background",
) {
  contentScriptSendMessage(OpenWikisMessages.ReportWikis, data, destination);
}

/**
 * Handles reporting of wikis from a content script tab.
 * @param tabId Tab id to report wikis for
 * @param data Wiki page data to report
 */
export async function reportWikisHandler(
  tabId: number,
  data: Omit<OpenWikiPage, "tabId">,
) {
  const currentWikis = await openWikisPagesItem.getValue();
  const wikiPage: OpenWikiPage = { ...data, tabId };

  const existingIndex = currentWikis.findIndex((w) => w.tabId === tabId);
  if (existingIndex >= 0) {
    currentWikis[existingIndex] = wikiPage;
  } else {
    currentWikis.push(wikiPage);
  }

  await openWikisPagesItem.setValue([...currentWikis]);
}

/**
 * For popup use tab switch message sender wrapper
 * @param tabId Tab ID to switch to
 * @param destination Destination to send the message to
 */
export function switchToTab(tabId: number, destination: Destination = "background") {
  popupSendMessage(OpenWikisMessages.SwitchToTab, { tabId }, destination);
}
