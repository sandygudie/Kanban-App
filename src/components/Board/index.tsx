import Modal from "components/Modal";
import { useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppState, IColumn, ITask } from "../../types";
import AddBoard from "./AddBoard";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import { addTask, appData, deleteTask } from "redux/boardSlice";
import { Droppable, DragDropContext } from "@hello-pangea/dnd";
import { colorMarker, colorSelection } from "utilis";
import { v4 as uuidv4 } from "uuid";
import { IoIosAdd } from "react-icons/io";
import CreateWorkspace from "./CreateWorkspace";
import { useMediaQuery } from "react-responsive";
import { PiDotsThreeLight } from "react-icons/pi";
import Popup from "components/Popup";

interface Props {
  showSidebar: boolean;
}

export default function Index({ showSidebar }: Props) {
  const data: AppState = useSelector(appData);
  const dispatch = useDispatch();
  const { active, profile } = data;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [isOpenBoard, setOpenBoard] = useState(false);
  const [isEditBoard, setEditBoard] = useState(false);
  const [isCreateWorkspace, setCreateWorkspace] = useState(false);
  const isMobile = useMediaQuery({ query: "(min-width: 700px)" });
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const activeCopy = { ...active };
    const sourceList = activeCopy.columns.find(
      (item: IColumn) => item.name === result.source.droppableId
    );
    const sourceTask = sourceList?.tasks.find(
      (item: ITask, index: number) => index === result.source.index
    );

    dispatch(deleteTask(sourceTask));
    const updatedTasks = {
      ...sourceTask,
      id: uuidv4(),
      status: result.destination.droppableId,
    };
    const position = result.destination.index;
    dispatch(addTask({ updatedTasks, position }));
  };

  const addCard = () => {};
  const editColumn = () => {};
  const deleteColumn = () => {};
  return (
    <div className="w-auto h-full">
      <>
        {active ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="h-[87vh]">
              <div
                style={{
                  marginLeft: showSidebar ? "clamp(260px, 10vw, 500px)" : "0px",
                }}
                className={`z-0 h-auto py-4 mb-8 pr-8 ${
                  isMobile ? "pl-8" : "pl-8"
                }`}
              >
                <div className="mt-3 z-10 h-full flex gap-x-10 w-full">
                  {active.columns?.map((item: IColumn, index: number) => {
                    return (
                      <div key={item.name} className="w-[250px] shrink-0">
                        <div className="flex justify-between items-center">
                          <div
                            className="flex gap-x-3 items-center text-gray 
            font-bold uppercase text-xs tracking-widest"
                          >
                            <BsCircleFill
                              style={{
                                fill:
                                  index < colorMarker.length
                                    ? colorMarker[index]
                                    : colorSelection(),
                              }}
                            />
                            {item.name} ({item.tasks.length})
                          </div>
                          <div className="relative">
                            <button onClick={() => setOpenPopup(true)}>
                              <PiDotsThreeLight
                                className="font-bold"
                                size={20}
                              />
                            </button>
                            {isOpenPopup ? (
                              <div>
                                <Popup
                                  handleOpenMenu={() => setOpenPopup(false)}
                                  style={{}}
                                  items={[
                                    {
                                      title: "Add Card",
                                      handler: addCard,
                                    },
                                    {
                                      title: "Edit Column",
                                      handler: editColumn,
                                    },
                                    {
                                      title: "Delete Column",
                                      handler: deleteColumn,
                                    },
                                  ]}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <Droppable droppableId={`${item.name}`}>
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="mt-4 h-full"
                            >
                              {item.tasks.length > 0 ? (
                                <div>
                                  {item.tasks.map(
                                    (tasks: ITask, index: number) => {
                                      const filtered = tasks.subtasks.filter(
                                        (item) => item.isCompleted === true
                                      );
                                      return (
                                        <TaskItem
                                          tasks={tasks}
                                          filtered={filtered}
                                          key={tasks.id}
                                          index={index}
                                        />
                                      );
                                    }
                                  )}
                                </div>
                              ) : (
                                <div className="w-[250px] shrink-0 h-full">
                                  <div className="h-screen dark:bg-secondary/20 border-dashed border-2 border-gray rounded-lg"></div>
                                </div>
                              )}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    );
                  })}

                  <div className="mt-8 h-screen w-[280px] pr-8 shrink-0">
                    <button
                      onClick={() => setEditBoard(true)}
                      className="h-full w-full bg-primary/20 cursor-pointer flex items-center flex-col justify-center text-center rounded-lg"
                    >
                      <p className="text-xl hover:text-primary/70 text-primary font-bold">
                        {" "}
                        + New Column
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </DragDropContext>
        ) : !profile.id.length ? (
          <CreateWorkspace />
        ) : (
          <div className=" fixed -translate-y-[50%] -translate-x-[50%] top-1/2 shadow-lg p-4 md:p-8 bg-primary/20 rounded-lg left-[50%] text-center">
            <div className="w-64 md:w-72 mx-auto h-auto">
              <img
                src="/empty-project.png"
                alt="start project"
                loading="eager"
                className="w-64 md:w-72 mx-auto h-auto"
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
        )}
      </>

      <Modal
        open={isOpen || isOpenBoard || isEditBoard || isCreateWorkspace}
        handleClose={() => {
          setIsOpen(false),
            setOpenBoard(false),
            setCreateWorkspace(false),
            setEditBoard(false);
        }}
      >
        {isEditBoard ? (
          <AddBoard active={active} handleClose={() => setEditBoard(false)} />
        ) : isOpenBoard ? (
          <AddBoard handleClose={() => setOpenBoard(false)} />
        ) : (
          <AddTask handleClose={() => setIsOpen(false)} />
        )}
      </Modal>
    </div>
  );
}
