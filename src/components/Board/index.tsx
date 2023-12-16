import Modal from "components/Modal";
import { useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { IBoard, IColumn, ITask } from "../../types";
import AddBoard from "./AddBoard";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import { addTask, appData, deleteTask } from "redux/boardSlice";
import { Droppable, DragDropContext } from "@hello-pangea/dnd";
import { randomColor } from "utilis";
import { v4 as uuidv4 } from "uuid";
import { IoIosAdd } from "react-icons/io";

export default function Index() {
  const data = useSelector(appData);
  const dispatch = useDispatch();
  const active: IBoard = data.active;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBoard, setOpenBoard] = useState(false);
  const [isEditBoard, setEditBoard] = useState(false);

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

  return (
    <div className="w-[72rem] h-full">
      <div className="mt-3 z-10 h-full flex gap-x-10 w-full">
        {active ? (
          <DragDropContext onDragEnd={onDragEnd}>
            {active.columns?.map((item: IColumn, index: number) => {
              return (
                <div key={item.name} className="w-[250px] shrink-0">
                  <p
                    className="flex gap-x-3 items-center text-gray 
            font-bold uppercase text-xs tracking-widest"
                  >
                    {" "}
                    <BsCircleFill
                      style={{
                        fill:
                          index === 0
                            ? "hsla(193, 75%, 59%,1)"
                            : index === 1
                            ? "hsla(249, 83% ,70%, 1)"
                            : randomColor(),
                      }}
                    />
                    {item.name} ({item.tasks.length})
                  </p>
                  <Droppable droppableId={`${item.name}`}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="mt-4 h-full"
                      >
                        {item.tasks.length > 0 ? (
                          <div>
                            {item.tasks.map((tasks: ITask, index: number) => {
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
                            })}
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

            <div className="mt-8 h-screen w-[250px] shrink-0">
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
          </DragDropContext>
        ) : (
          <div className="fixed translate-x-[50%] md:-translate-y-[50%] md:top-1/2  md:left-[45%] text-center">
            <div className="w-72 h-auto">
              <img
                src="/start-project.png"
                alt="start project"
                loading="eager"
                className="w-72 h-auto"
              />
            </div>
            <h1 className="mt-8 text-primary text-2xl font-bold ">
              Welcome to Kanban!
            </h1>
            <p className="text-gray mt-1 text-sm mb-8">
              Get started by creating your first project board!
            </p>
            <button
              onClick={() => {
                setOpenBoard(true);
              }}
              className="font-bold  bg-primary rounded-xl px-6 py-3 cursor-pointer text-white transition ease-in-out delay-100 duration-500 bg-blue-500 hover:-translate-y-1 hover:scale-110
      "
            >
              <div className="flex items-center justify-center gap-x-2">
                <span>
                  <IoIosAdd />
                </span>{" "}
                Create New Board
              </div>
            </button>
          </div>
        )}
      </div>

      <Modal
        open={isOpen || isOpenBoard || isEditBoard}
        handleClose={() => {
          setIsOpen(false), setOpenBoard(false), setEditBoard(false);
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
