import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.tsx";

// Prevent scroll restoration issues on page refresh
if (window.history.scrollRestoration) {
  window.history.scrollRestoration = 'manual';
}

// Scroll to top on initial load
window.scrollTo(0, 0);

// Ensure body is visible as fallback (in case GSAPContext fails)
document.addEventListener('DOMContentLoaded', () => {
  // Add a slight delay to ensure GSAPContext has time to add the 'loaded' class
  setTimeout(() => {
    if (!document.body.classList.contains('loaded')) {
      document.body.classList.add('loaded');
    }
  }, 250); // Increased to match GSAPContext timeout
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
