import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./user.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
