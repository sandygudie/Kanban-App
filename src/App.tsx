import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "components/LoadingSpinner";
import NotFound from "page/notFound";
import Workspace from "page/workspace";
import Dashboard from "page/dashboard";
import Home from "page/home";

function App() {
  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === null) {
      localStorage.setItem("theme", "dark");
    }
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <React.Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen bg-skin-fill">
          <LoadingSpinner />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
