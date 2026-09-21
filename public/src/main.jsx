import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";

// Start fetching the two portrait assets before React mounts.
// The loading screen also waits for decode(), so the first visible frame is
// ready instead of revealing an empty image and then swapping it in.
const criticalImages = [
  new URL("./assets/its-me.webp", import.meta.url).href,
  new URL("./assets/hero-photo.webp", import.meta.url).href,
];

criticalImages.forEach((src) => {
  const img = new Image();
  img.decoding = "async";
  img.fetchPriority = "high";
  img.src = src;
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
