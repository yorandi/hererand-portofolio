"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    const followSystem = () => {
      try {
        if (localStorage.getItem("hererand-theme")) return;
      } catch { /* System preference still works when storage is unavailable. */ }
      document.documentElement.dataset.theme = media.matches ? "dark" : "light";
      sync();
    };
    const storageChanged = (event: StorageEvent) => {
      if (event.key !== "hererand-theme" && event.key !== null) return;
      document.documentElement.dataset.theme = event.newValue === "light" || event.newValue === "dark"
        ? event.newValue : media.matches ? "dark" : "light";
      sync();
    };
    sync();
    media.addEventListener("change", followSystem);
    window.addEventListener("storage", storageChanged);
    return () => {
      media.removeEventListener("change", followSystem);
      window.removeEventListener("storage", storageChanged);
    };
  }, []);

  function toggle() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem("hererand-theme", next); } catch { /* Keep the toggle usable without storage. */ }
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle}
      aria-label={theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Toggle color theme"}
      title={theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Toggle color theme"}>
      <Sun size={18} className="theme-sun" aria-hidden="true" />
      <Moon size={18} className="theme-moon" aria-hidden="true" />
    </button>
  );
}
