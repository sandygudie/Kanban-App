import { useState, useEffect } from "react";
import Header from "components/Header";
import { GoSidebarCollapse } from "react-icons/go";
import SideBar from "components/SideBar";
import Board from "components/Board";
import { useSelector } from "react-redux";
import { appData } from "redux/boardSlice";
import { AppState } from "types";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const data: AppState = useSelector(appData);
  const { profile, board } = data;
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(min-width: 700px)" });

  useEffect(() => {
    if (!profile.id.length) {
      navigate("/workspace");
    }
    if (isMobile === false && board.length < 1) {
      console.log("see");
      setShowSidebar(false);
    }
  }, [board.length, isMobile, navigate, profile.id.length]);

  return (
    <div className="w-full h-full relative">
      <Header />
      <div className="w-full h-screen">
        <div
          className={`absolute top-[65px] ${
            board.length ? "h-[90vh] overflow-auto" : "h-full"
          }  w-full`}
        >
          {profile.id.length ? (
            <SideBar
              setShowSidebar={setShowSidebar}
              showSidebar={showSidebar}
            />
          ) : null}
          <Board showSidebar={showSidebar} />
        </div>
      </div>

      <button
        aria-label="Visibilityoff"
        onClick={() => {
          setShowSidebar(true);
        }}
        className={` ${
          showSidebar ? "opacity-0 delay-100 " : "opacity-100 delay-500"
        } cursor-pointer z-20 fixed top-16 text-white rounded-r-full bg-primary p-2 transition ease-in-out`}
      >
        {" "}
        < GoSidebarCollapse size={20} />{" "}
      </button>
    </div>
  );
}
