import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import AddBoard from "./Board/AddBoard";
import logoMobile from "../assets/logo-mobile.svg";
import AddTask from "./Board/AddTask";
import DeleteItem from "./DeleteItem";
import Icon from "./Icon";
import Modal from "./Modal";
import Popup from "./Popup";
import { useSelector } from "react-redux";
import { appData } from "redux/boardSlice";
import { AppState } from "types";
import ToggleBtn from "./ToggleBtn";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineChevronDown } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBoard, setOpenBoard] = useState(false);
  const [isWorkspaceMenu, setWorkspaceMenu] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isDeleteBoard, setDeleteBoard] = useState(false);
  const data: AppState = useSelector(appData);
  const { active, profile } = data;
  const currentTheme = localStorage.getItem("theme")!;
  const [theme, setTheme] = useState(currentTheme ? currentTheme : "dark");
  const updateThemehandler = (theme: string) => setTheme(theme);
  const navigate = useNavigate();
  const editBoard = () => {
    setOpenBoard(true);
    setOpenMenu(false);
  };
  const handleOpenMenu = () => setOpenMenu(false);

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
                  <>
                    <button
                      onClick={() => setOpenMenu(!isOpenMenu)}
                      className="text-base font-bold flex items-center gap-x-1  px-2.5 md:px-5 py-2.5 rounded-full bg-primary/70 hover:bg-primary text-sm font-bold text-white"
                    >
                      <span>
                        <MdOutlineDashboard className="font-bold md:text-xl" />
                      </span>
                      <span className="hidden md:inline"> Board</span>
                    </button>
                    {isOpenMenu && (
                      <Popup
                        style={{ top: 60, right: 24 }}
                        handleOpenMenu={handleOpenMenu}
                        items={[
                          {
                            title: "Edit Board",
                            handler: editBoard,
                          },
                          {
                            title: "Delete Board",
                            handler: () => {
                              setDeleteBoard(true), handleOpenMenu();
                            },
                          },
                        ]}
                      />
                    )}
                  </>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={isOpen || isOpenBoard || isDeleteBoard}
        handleClose={() => {
          setIsOpen(false), setDeleteBoard(false), setOpenBoard(false);
        }}
      >
        {isOpenBoard ? (
          <AddBoard active={active} handleClose={() => setOpenBoard(false)} />
        ) : isDeleteBoard ? (
          <DeleteItem
            handleClose={() => setDeleteBoard(false)}
            isDeleteBoard={isDeleteBoard}
            name={active.name}
          />
        ) : (
          <AddTask handleClose={() => setIsOpen(false)} />
        )}
      </Modal>
    </div>
  );
}
