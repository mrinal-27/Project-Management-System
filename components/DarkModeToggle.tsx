"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dark-mode");
    if (saved === "true") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  function toggleDark() {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("dark-mode", String(isDark));
    setDark(isDark);
  }

  return (
    <button
      onClick={toggleDark}
      style={{
        padding: "8px 14px",
        background: dark ? "#444" : "#ddd",
        color: dark ? "white" : "black",
        borderRadius: 6,
        border: "1px solid #aaa",
        cursor: "pointer",
        marginBottom: 20
      }}
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
