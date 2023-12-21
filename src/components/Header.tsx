import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import AddBoard from "./Board/AddBoard";
import { useMediaQuery } from "react-responsive";
import logoMobile from "../assets/logo-mobile.svg";
import AddTask from "./Board/AddTask";
import DeleteItem from "./DeleteItem";
import Icon from "./Icon";
import Modal from "./Modal";
import Popup from "./Popup";
import { FiChevronDown } from "react-icons/fi";
// import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import { appData } from "redux/boardSlice";
import { AppState } from "types";
import ToggleBtn from "./ToggleBtn";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBoard, setOpenBoard] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isDeleteBoard, setDeleteBoard] = useState(false);
  const [showDowndrop, setShowDropDown] = useState(false);
  // const [addBoardMobile, setAddBoardMobile] = useState(false);
  const data: AppState = useSelector(appData);
  const { active, profile } = data;
  const currentTheme = localStorage.getItem("theme")!;
  const [theme, setTheme] = useState(currentTheme ? currentTheme : "dark");
  const updateThemehandler = (theme: string) => setTheme(theme);

  const editBoard = () => {
    setOpenBoard(true);
    setOpenMenu(false);
  };
  const handleOpenMenu = () => setOpenMenu(false);
  // const handleaddBoardMobile = () => setAddBoardMobile(true);
  const isMobile = useMediaQuery({ query: "(min-width: 700px)" });

  return (
    <div>
      <div className="bg-white h-[65px] dark:bg-secondary flex items-center fixed w-full border-b-[1px] border-gray/20">
        {isMobile ? (
          <div
            className={`border-r-[1px] border-gray/20 py-6 px-4 min-w-[14rem] cursor-pointer`}
          >
            <Icon type="kanban_logo" />
          </div>
        ) : (
          <div className="border-gray/20 p-3 cursor-pointer">
            <img src={logoMobile} alt="logo" className="w-8 h-8" />
          </div>
        )}
        <div
          className={`flex items-center justify-between w-full ${
            isMobile ? "px-4" : "pr-4"
          }`}
        >
          {profile.id.length ? (
            <>
              {isMobile ? (
                <h3 className="font-bold text-base">
                 {profile.name} Workspace 
                </h3>
              ) : (
                <button
                  onClick={() => {
                    setShowDropDown(!showDowndrop);
                  }}
                  className="flex items-center relative"
                >
                  <h3 className="font-bold text-sm md:text-xl">
                    {profile.name}
                  </h3>{" "}
                  <span>
                    <FiChevronDown className="inline vertical-bottom" />
                  </span>
                </button>
              )}

            
            </>
          ) : (
            <h1 className="font-bold text-gray text-lg"> No Workspace</h1>
          )}
       
          <div className="flex items-center gap-x-6">
          <ToggleBtn updateThemehandler={updateThemehandler} theme={theme} />
          {active ? (
                <div className="flex items-center">
                  <button
                    aria-label="Add Task"
                    onClick={() => setIsOpen(true)}
                    className={`hover:bg-primary/40 rounded-full bg-primary text-sm font-bold text-white ${
                      !isMobile ? "w-[30px] h-[30px]" : "px-6 py-2"
                    } `}
                  >
                    {!isMobile ? (
                      <IoIosAdd className="inline-flex text-2xl" />
                    ) : (
                      <span className="flex justify-center items-center">
                        {" "}
                        <span>
                          <IoIosAdd className="font-bold text-2xl" />
                        </span>{" "}
                        Add Task
                      </span>
                    )}
                  </button>
                  <button>
                    <BiDotsVerticalRounded
                      onClick={() => setOpenMenu(!isOpenMenu)}
                      className="text-3xl hover:text-primary cursor-pointer"
                    />
                  </button>
                </div>
              ) : null}
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
      {isOpenMenu && (
        <Popup
        style={{}}
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

      {/* {showDowndrop && !isMobile && (
        <div className="absolute top-10">
          <Modal
            showDowndrop={showDowndrop}
            open={showDowndrop}
            handleClose={() => {
              setShowDropDown(false), setAddBoardMobile(false);
            }}
          >
            {addBoardMobile ? (
              <AddBoard handleClose={() => setIsOpen(false)} />
            ) : (
              <SideBar handleaddBoardMobile={handleaddBoardMobile} />
            )}
          </Modal>
        </div>
      )} */}
    </div>
  );
}
