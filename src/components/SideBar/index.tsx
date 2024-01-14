import { Dispatch, SetStateAction, useState } from "react";
import { GoSidebarExpand } from "react-icons/go";
import Icon from "components/Icon";
import { AppState, IBoard } from "types";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { appData, activeItem } from "redux/boardSlice";
import { IoIosAdd } from "react-icons/io";
import Modal from "components/Modal";
import AddBoard from "components/Board/AddBoard";
interface Props {
  showSidebar: boolean;
  setShowSidebar?: Dispatch<SetStateAction<boolean>>;
  handleClose?: () => void;
  handleaddBoardMobile?: () => void;
}

export default function Index({
  handleaddBoardMobile,
  setShowSidebar,
  handleClose,
  showSidebar,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const data: AppState = useSelector(appData);
  const { active, board, profile } = data;
  const isMobile = useMediaQuery({ query: "(min-width: 700px)" });

  return (
    <>
      <>
        <div
          className={`h-screen fixed z-20 w-56 transition duration-700 ease-in-out ${
            showSidebar ? "translate-x-0" : "-translate-x-64"
          }`}
        >
          <div
            className={`z-40 text-gray bg-white dark:bg-secondary ${
              isMobile && "pr-2 pb-24 border-r-[1px] border-gray/20"
            } pt-4 flex flex-col justify-between h-full left-0 `}
          >
            <div>
              <p className="pl-4 pt-6 pb-2 text-xs">
                ALL BOARDS ({board.length})
              </p>
              <div>
                {board && (
                  <>
                    {board.map((options: IBoard) => {
                      return (
                        <button
                          key={options.id}
                          className={`py-3 w-52 px-4 flex items-center gap-x-2 font-bold cursor-pointer ${`${
                            active.id === options.id
                              ? "bg-primary rounded-r-full text-white"
                              : "hover:bg-primary/20 rounded-r-full"
                          } `} `}
                          onClick={() => {
                            dispatch(activeItem(options));
                            if (handleClose) {
                              handleClose();
                            }
                          }}
                        >
                          <Icon type="board" />
                          {options.name}
                        </button>
                      );
                    })}
                  </>
                )}

                {profile.id.length ? (
                  <button
                    onClick={() => {
                      handleaddBoardMobile
                        ? handleaddBoardMobile()
                        : setIsOpen(true);
                    }}
                    className="pl-4 mt-4 font-bold cursor-pointer text-primary/80 hover:text-primary"
                  >
                    <div className="flex items-center ">
                      {" "}
                      <span>
                        {" "}
                        <IoIosAdd size={20} />{" "}
                      </span>{" "}
                      <p> Add New Board</p>
                    </div>
                  </button>
                ) : null}
              </div>
            </div>

            <div className="mb-4 absolute top-0 right-0 md:mb-0">
              <button
                aria-label="Hide Sidebar"
                onClick={() => {
                  setShowSidebar ? setShowSidebar(false) : null;
                }}
                className="cursor-pointer text-white bg-primary p-2 rounded-l-full border-none inline-flex items-center gap-x-2 text-xs"
              >
                <GoSidebarExpand size={20} />
              </button>
            </div>
          </div>
        </div>
      </>
      <Modal open={isOpen} handleClose={() => setIsOpen(false)}>
        <AddBoard handleClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
