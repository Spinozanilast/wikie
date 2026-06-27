import { useState } from "react";

import WelcomeView from "~/features/welcome.popup/View";
import MainView from "~/features/main.popup/View";
import SettingsView from "~/features/settings.popup/View";

const WELCOMED_KEY = "wikie-welcomed";

enum View {
  Welcome,
  Main,
  Settings,
}

function App() {
  const [activeView, setView] = useState<View>(() => {
    return localStorage.getItem(WELCOMED_KEY) === "true" ? View.Main : View.Welcome;
  });

  switch (activeView) {
    case View.Welcome:
      return (
        <WelcomeView localStorageKey={WELCOMED_KEY} onDone={() => setView(View.Main)} />
      );
    case View.Main:
      return <MainView openSettingPage={() => setView(View.Settings)} />;
    case View.Settings:
      return <SettingsView openMainPage={() => setView(View.Main)} />;
    default:
      return null;
  }
}

export default App;
