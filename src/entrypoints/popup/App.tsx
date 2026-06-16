import { useState } from "react";

import WelcomeScreen from "~/components/PopupViews/Welcome";
import MainScreen from "~/components/PopupViews/Main";

const WELCOMED_KEY = "wikie-welcomed";

function App() {
  const [welcomed, setWelcomed] = useState(
    () => localStorage.getItem(WELCOMED_KEY) === "true",
  );

  if (!welcomed)
    return (
      <WelcomeScreen localStorageKey={WELCOMED_KEY} onDone={() => setWelcomed(true)} />
    );
  return <MainScreen />;
}

export default App;
