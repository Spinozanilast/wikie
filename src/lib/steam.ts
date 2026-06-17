type SteamAppData = { appId: string; name: string };

export function extractSteamAppIdAndName(): SteamAppData | null {
  const match = window.location.pathname.match(/\/app\/(\d+)(?:\/([^/]+))?/);

  if (!match) return null;

  let appName: string;
  if (match[2]) {
    appName = match[2].replaceAll("_", " ");
  } else {
    appName = "Unknown Game";
  }

  return { appId: match[1], name: appName };
}
