import { storage } from "@wxt-dev/storage";
import { sendMessage as contentScriptSendMessage } from "webext-bridge/content-script";
import { sendMessage as popupSendMessage } from "webext-bridge/popup";
import type { Destination } from "webext-bridge";

export interface OpenWikiPage {
  appId: string;
  appName: string;
  source: "steam" | "steamdb";
  wikisFoundNum: number;
  tabId: number;
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
 * For popup use tab switch message sender wrapper
 * @param tabId Tab ID to switch to
 * @param destination Destination to send the message to
 */
export function switchToTab(tabId: number, destination: Destination = "background") {
  popupSendMessage(OpenWikisMessages.SwitchToTab, { tabId }, destination);
}
