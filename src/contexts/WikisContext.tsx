import { createContext, ReactNode } from "react";
import { WikiInfo } from "~/backend/messaging/wikis";

interface AppWikisContextType {
  appId: string;
  appName: string;
  addWiki: (wiki: WikiInfo) => void;
  getWikis: () => WikiInfo[];
  wikisCount: number;
  setAppInfo: (appId: string, appName: string) => void;
}

const WikisContext = createContext<AppWikisContextType | null>(null);

export function AppWikisInfoStore({ children }: { children: ReactNode }) {
  const [appId, setAppId] = useState<string>("");
  const [appName, setAppName] = useState<string>("");
  const [wikisCount, setWikisCount] = useState<number>(0);
  const [wikis, setWikis] = useState<WikiInfo[]>([]);

  const addWiki = (wiki: WikiInfo) => {
    setWikisCount((prevNum) => prevNum + 1);
    setWikis((prevWikis) => [...prevWikis, wiki]);
  };

  const getWikis = () => {
    return wikis;
  };

  const setAppInfo = (appId: string, appName: string) => {
    setAppId(appId);
    setAppName(appName);
  };

  return (
    <WikisContext.Provider
      value={{ appId, appName, addWiki, getWikis, wikisCount, setAppInfo }}
    >
      {children}
    </WikisContext.Provider>
  );
}

export function useAppWikis() {
  const ctx = useContext(WikisContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
