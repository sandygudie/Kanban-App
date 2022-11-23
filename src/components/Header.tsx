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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBoard, setOpenBoard] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isDeleteBoard, setDeleteBoard] = useState(false);
  const [showDowndrop, setShowDropDown] = useState(false);

  const data = useSelector(appData);
  const { active } = data;

  const editBoard = () => {
    setOpenBoard(true);
  };
  const isMobile = useMediaQuery({ query: "(min-width: 700px)" });
  return (
    <>
      <div className=" bg-white dark:bg-secondary flex items-center fixed w-full border-b-[1px] border-gray/20">
        {isMobile ? (
          <div
            className={`border-r-[1px] border-gray/20 p-6 min-w-[18rem] cursor-pointer`}
          >
            <Icon type="kanban_logo" />
          </div>
        ) : (
          <div className="border-gray/20 p-6 cursor-pointer">
            <img src={logoMobile} alt="logo" />
          </div>
        )}
        <div
          className={`flex items-center justify-between w-full ${
            isMobile ? "px-4" : " pr-4"
          }`}
        >
          {active ? (
            <>
              {isMobile ? (
                <h3 className="font-bold text-xl">{active.name}</h3>
              ) : (
                <div
                  onClick={() => {
                    setShowDropDown(!showDowndrop);
                  }}
                  className="flex items-center relative"
                >
                  <h3 className="font-bold text-xl">{active.name}</h3>{" "}
                  <span>
                    <FiChevronDown className="inline vertical-bottom" />
                  </span>
                  <div className="absolute top-10">
                    {showDowndrop && (
                      <>
                        <Modal
                          showDowndrop={showDowndrop}
                          open={showDowndrop}
                          handleClose={() => setShowDropDown(false)}
                        >
                          <SideBar />
                        </Modal>
                      </>
                    )}
                  </div>
                </div>
              )}
              <div className="flex items-center">
                <button
                  onClick={() => setIsOpen(true)}
                  className={`rounded-full bg-primary text-sm font-bold text-white ${
                    !isMobile ? "w-[40px]" : "w-32"
                  } h-[40px]`}
                >
                  {!isMobile ? (
                    <IoIosAdd className="inline-flex" />
                  ) : (
                    <span className="py-8"> + Add Task</span>
                  )}
                </button>
                <div>
                  <BiDotsVerticalRounded
                    onClick={() => setOpenMenu(!isOpenMenu)}
                    className="text-3xl cursor-pointer"
                  />
                </div>
              </div>
            </>
          ) : (
            <h1 className="font-bold text-xl"> No Board item</h1>
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
          setOpenMenu={setOpenMenu}
          items={[
            {
              title: "Edit board",
              handler: editBoard,
            },
            {
              title: "Delete Board",
              handler: () => setDeleteBoard(true),
            },
          ]}
        />
      )}
    </>
  );
}
