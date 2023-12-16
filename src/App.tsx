import React from "react";
import Home from "pages/Home";
import { Route, Routes } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import LoadingSpinner from "components/LoadingSpinner";
import NotFound from "pages/NotFound";

function App() {
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
