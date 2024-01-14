import Modal from "components/Modal";
import { useState } from "react";
import { ISubTask, ITask } from "types";
import AddTask from "./AddTask";
import TaskDetails from "./TaskDetails";
import { Draggable } from "@hello-pangea/dnd";
import { colorSelection } from "utilis";
interface Props {
  tasks: ITask;
  filtered: ISubTask[];
  index: number;
}

export default function TaskItem({ tasks, filtered, index }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);

  return (
    <>
      <Draggable key={tasks.id} draggableId={tasks.id.toString()} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`${
                snapshot.isDragging
                  ? "!top-auto !left-auto bg-purple/20"
                  : "bg-white dark:bg-secondary"
              } select-none rounded-lg`}
              data-id={index}
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <div
                style={{
                  borderColor: colorSelection(),
                }}
                className="shadow-lg hover:bg-gray/20
              cursor-pointer rounded-lg border-l-2 mb-4 py-6 px-4"
              >
                <p className="font-bold text-sm">{tasks.title} </p>
                <p className="pt-2 text-xs text-gray font-bold">
                  {" "}
                  {filtered.length} of {tasks.subtasks.length} subtasks
                </p>
              </div>
            </div>
          );
        }}
      </Draggable>
      <Modal open={isOpen} handleClose={() => setIsOpen(false)}>
        <TaskDetails
          filtered={filtered}
          subtasks={tasks.subtasks}
          tasks={tasks}
          handleClose={() => setIsOpen(false)}
          index={index}
          handleOpenModal={handleOpenModal}
        />
      </Modal>
      <Modal open={isOpenModal} handleClose={() => setOpenModal(false)}>
        <AddTask
          tasks={tasks}
          index={index}
          handleClose={() => setOpenModal(false)}
        />
      </Modal>
    </>
  );
}
