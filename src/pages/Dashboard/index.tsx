import React, { useState, useEffect } from "react";
import Header from "components/Header";
import { Collapse } from "@chakra-ui/react";
import { MdVisibilityOff } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import SideBar from "components/SideBar";
import Board from "components/Board";

export default function Index() {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const isMobile = useMediaQuery({ query: "(min-width: 700px)" });

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
    <div className="w-full h-full">
      <Header />
      <div className="w-full h-screen">
        <div className={`absolute top-[75px] overflow-auto w-full`}>
          <div className={`h-[87vh]`}>
            {isMobile && (
              <Collapse in={showSidebar} animateOpacity>
                <div
                  className={`z-20 h-screen fixed w-60 ${
                    showSidebar ? "block " : "hidden"
                  }`}
                >
                  <SideBar setShowSidebar={setShowSidebar} />
                </div>
              </Collapse>
            )}

            <div
              style={{
                marginLeft:
                  showSidebar && isMobile ? "clamp(260px, 10vw, 500px)" : "0px",
              }}
              className={`z-0 h-auto py-4 mb-8 pr-8 ${
                isMobile ? "pl-8" : "pl-8"
              }`}
            >
              <Board />
            </div>
          </div>
        </div>
      </div>

      <button
        aria-label="Visibilityoff"
        onClick={() => {
          setShowSidebar(true);
        }}
        className={` ${
          showSidebar ? "hidden" : "block"
        } cursor-pointer fixed bottom-10 text-white rounded-r-full bg-primary p-4 w-12 transition ease-in-out duration-[2s]`}
      >
        {" "}
        <MdVisibilityOff size={20} />{" "}
      </button>
    </div>
  );
}
