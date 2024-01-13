import { useSelector } from "react-redux";
import { AppState } from "../../types";
import { IoIosAdd } from "react-icons/io";
import { appData } from "redux/boardSlice";
import ActiveBoard from "./ActiveBoard";
import { useState } from "react";
import Modal from "components/Modal";
import AddBoard from "./AddBoard";

interface Props {
  showSidebar: boolean;
}

export default function Index({ showSidebar }: Props) {
  const [isOpenBoard, setOpenBoard] = useState(false);
  const data: AppState = useSelector(appData);
  const { active, board } = data;
  return (
    <>
      <div className={` ${board.length ? "h-auto" : "h-full"} w-auto`}>
        <div
          className={`${
            showSidebar ? "translate-x-64" : "translate-x-0"
          } transition duration-700 ease-in-out h-full pt-8 pb-28 mb-24 pr-8 pl-8`}
        >
          {active ? (
            <ActiveBoard />
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="shadow-lg p-4 md:p-8 bg-primary/20 rounded-lg w-64 md:w-96 mx-auto text-center">
                <div className="w-52 md:w-72 mx-auto h-auto">
                  <img
                    src="/empty-project.png"
                    alt="start project"
                    loading="eager"
                    className="w-52 md:w-72 mx-auto h-auto"
                  />
                </div>
                <div className="">
                  <h2 className="font-bold md:text-2xl text-gray ">
                    Create your first board
                  </h2>
                  <p className="mt-1 text-gray text-base mb-8">
                    You don&apos;t have any board for this workspace
                  </p>
                </div>
                <button
                  onClick={() => {
                    setOpenBoard(true);
                  }}
                  className="font-bold bg-primary rounded-xl px-6 py-3 cursor-pointer text-white transition ease-in-out delay-100 duration-500 bg-blue-500 hover:-translate-y-1 hover:scale-110
      "
                >
                  <div className="flex items-center justify-center gap-x-2">
                    <span>
                      <IoIosAdd />
                    </span>{" "}
                    Add New Board
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal open={isOpenBoard} handleClose={() => setOpenBoard(false)}>
        <AddBoard handleClose={() => setOpenBoard(false)} />
      </Modal>
    </>
  );
}
