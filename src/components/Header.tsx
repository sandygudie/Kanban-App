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
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import { appData } from "redux/boardSlice";
import { IBoard } from "types";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBoard, setOpenBoard] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isDeleteBoard, setDeleteBoard] = useState(false);
  const [showDowndrop, setShowDropDown] = useState(false);
  const [addBoardMobile, setAddBoardMobile] = useState(false);

  const data = useSelector(appData);
  const active: IBoard = data.active;

  const editBoard = () => {
    setOpenBoard(true);
    setOpenMenu(false);
  };
  const handleOpenMenu = () => setOpenMenu(false);
  const handleaddBoardMobile = () => setAddBoardMobile(true);
  const isMobile = useMediaQuery({ query: "(min-width: 700px)" });

  return (
    <>
      <div className="bg-white dark:bg-secondary flex items-center fixed w-full border-b-[1px] border-gray/20">
        {isMobile ? (
          <div
            className={`border-r-[1px] border-gray/20 p-6 min-w-[15rem] cursor-pointer`}
          >
            <Icon type="kanban_logo" />
          </div>
        ) : (
          <div className="border-gray/20 p-3 cursor-pointer">
            <img src={logoMobile} alt="logo" className="w-8 h-8" />
          </div>
        )}
        <div
          className={`flex items-center justify-between w-full ${isMobile ? "px-4" : "pr-4"
            }`}
        >
          {active ? (
            <>
              {isMobile ? (
                <h3 className="font-bold text-xl">{active.name}</h3>
              ) : (
                <button
                  onClick={() => {
                    setShowDropDown(!showDowndrop);
                  }}
                  className="flex items-center relative"
                >
                  <h3 className="font-bold text-sm md:text-xl">
                    {active.name}
                  </h3>{" "}
                  <span>
                    <FiChevronDown className="inline vertical-bottom" />
                  </span>
                </button>
              )}
              <div className="flex items-center">
                <button
                  aria-label="Add Task"
                  onClick={() => setIsOpen(true)}
                  className={`hover:bg-primary/40 rounded-full bg-primary text-sm font-bold text-white ${!isMobile ? "w-[30px] h-[30px]" : "px-6 py-2"
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
            </>
          ) : (
            <h1 className="font-bold text-xl"> No Board</h1>
          )}
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

      {showDowndrop && !isMobile && (
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
      )}
    </>
  );
}
