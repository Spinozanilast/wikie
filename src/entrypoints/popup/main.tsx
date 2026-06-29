import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ThemeProvider } from "~/contexts/ThemeContext.tsx";

import "~/assets/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
