import { useState, useEffect } from "react";
import Header from "components/Header";
import { Collapse } from "@chakra-ui/react";
import { MdVisibilityOff } from "react-icons/md";
import SideBar from "components/SideBar";
import Board from "components/Board";
import { useSelector } from "react-redux";
import { appData } from "redux/boardSlice";
import { AppState } from "types";
import { useMediaQuery } from "react-responsive";

export default function Index() {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const data: AppState = useSelector(appData);
  const { profile, board } = data;

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
  const isMobile = useMediaQuery({ query: "(min-width: 700px)" });
  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full h-screen">
        <div className={`absolute top-[65px] overflow-auto w-full`}>
          {profile.id.length ? (
            <div
              className={`${
                isMobile === false && board.length < 1 ? "hidden" : "block"
              }`}
            >
              <Collapse in={showSidebar} animateOpacity>
                <div
                  className={`h-screen fixed w-56 z-40 ${
                    showSidebar ? "block " : "hidden"
                  }`}
                >
                  <SideBar setShowSidebar={setShowSidebar} />
                </div>
              </Collapse>
            </div>
          ) : null}

          <div>
            <Board showSidebar={showSidebar} />
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
