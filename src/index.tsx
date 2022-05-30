import * as React from "react";
import App from "./App";
import config from "./config/config.json";
import { DebugProvider } from "./hooks/useDebug";
import { createRoot } from "react-dom/client";

const run = () => {
  const rootDiv = document.createElement("div");
  rootDiv.setAttribute("id", "app");
  document.body.prepend(rootDiv);

  const root = createRoot(rootDiv);

  root.render(
    <DebugProvider debug={config.debug}>
      <App></App>
    </DebugProvider>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  run();
});
