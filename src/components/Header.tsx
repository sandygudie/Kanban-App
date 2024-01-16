import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import logoMobile from "../assets/logo-mobile.svg";
import AddTask from "./Board/AddTask";
import Icon from "./Icon";
import Modal from "./Modal";
import Popup from "./Popup";
import { useSelector } from "react-redux";
import { appData } from "redux/boardSlice";
import { AppState } from "types";
import ToggleBtn from "./ToggleBtn";
import { HiOutlineChevronDown } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { GoScreenFull } from "react-icons/go";
import { MdZoomInMap } from "react-icons/md";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isWorkspaceMenu, setWorkspaceMenu] = useState(false);
  const data: AppState = useSelector(appData);
  const { active, profile } = data;
  const currentTheme = localStorage.getItem("theme")!;
  const [theme, setTheme] = useState(currentTheme ? currentTheme : "dark");
  const updateThemehandler = (theme: string) => setTheme(theme);
  const [isFullscreen, setFullScreen] = useState(false);
  const navigate = useNavigate();

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullScreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullScreen(false);
    }
  }
  return (
    <div>
      <div className="fixed w-full z-40">
        <div className="bg-white h-[65px] dark:bg-secondary flex items-center absolute w-full border-b-[1px] border-gray/20">
          <div
            className={`border-r-[1px] border-gray/20 h-[65px] items-start flex-col justify-center px-4 min-w-[14rem] cursor-pointer hidden md:flex`}
          >
            <Icon type="kanban_logo" />
          </div>
          <div className="block md:hidden border-gray/20 p-3 md:min-w-[14rem] cursor-pointer">
            <img src={logoMobile} alt="logo" className="w-8 h-8" />
          </div>

          <div
            className={`flex items-center justify-between w-full pr-2 md:px-4`}
          >
            <div className="relative w-20">
              <button
                onClick={() => {
                  setWorkspaceMenu(!isWorkspaceMenu);
                }}
                className="flex items-center relative"
              >
                <h3
                  className={`${
                    profile.name.length > 10 ? "truncate w-[10ch]" : "w-auto"
                  } font-bold md:w-auto sm:text-base md:text-xl`}
                >
                  {profile.name}
                </h3>{" "}
                <HiOutlineChevronDown className="mt-1 text-sm" />
              </button>
              {isWorkspaceMenu && (
                <Popup
                  description={
                    <div className="flex gap-x-6 items-center border-b-[1px] border-gray/30 py-4 dark:text-white text-gray font-medium px-4 justify-center ">
                      <div className="w-8 h-8">
                        <img
                          src="./workspace-placeholder.webp"
                          className="w-8 h-8 object-fit"
                          alt=""
                        />
                      </div>
                      <div className="dark:text-white text-black ">
                        <h2 className="text-xl font-bold">{profile.name}</h2>
                        <p className="text-xs">{profile.email}</p>
                      </div>
                    </div>
                  }
                  style={{ top: 45, right: "-8rem" }}
                  handleOpenMenu={() => setWorkspaceMenu(false)}
                  items={[
                    {
                      title: `Invite people to ${profile.name}`,
                      handler: () => {},
                      status: false,
                    },
                    {
                      title: "Workspace settings",
                      handler: () => {},
                      status: false,
                    },
                    {
                      title: "Switch workspace",
                      handler: () => {
                        navigate("/workspace");
                      },
                      status: true,
                    },
                  ]}
                />
              )}
            </div>

            <div className="flex items-center gap-x-6">
              <button
                onClick={() => toggleFullScreen()}
                className="font-bold text-primary text-xl"
              >
                {isFullscreen ? <MdZoomInMap /> : <GoScreenFull />}
              </button>
              <ToggleBtn
                updateThemehandler={updateThemehandler}
                theme={theme}
              />
              {active ? (
                <div className="flex gap-x-4 items-center">
                  {active.columns.length ? (
                    <button
                      aria-label="Add Task"
                      onClick={() => setIsOpen(true)}
                      className={`bg-primary/70 hover:bg-primary rounded-full bg-primary text-sm font-bold text-white 
                  px-1.5 py-1.5 md:px-4 md:py-2 
                  } `}
                    >
                      <IoIosAdd className="md:hidden inline-flex text-xl md:text-2xl" />

                      <span className="hidden md:flex justify-center items-center">
                        {" "}
                        <span>
                          <IoIosAdd className="font-bold text-2xl" />
                        </span>{" "}
                        Add Task
                      </span>
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
      >
        <AddTask handleClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
}
