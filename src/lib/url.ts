type SteamAppData = { appId: string; name: string };

export function extractSteamUrlAppIdAndName(): SteamAppData | null {
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

export function extractSteamUrlAppId(): string | null {
  const match = window.location.pathname.match(/\/app\/(\d+)/);
  return match ? match[1] : null;
}
