import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_APP_SENTRY_API_KEY,
  release: "1.0",
  environment: "dev",
  normalizeDepth: 6,
  integrations: [
    new Sentry.Integrations.Breadcrumbs({ console: true }),
    new Sentry.BrowserTracing(),
  ],
});

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
