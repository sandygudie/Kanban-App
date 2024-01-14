import { useDispatch, useSelector } from "react-redux";
import {
  appData,
  deleteBoard,
  deleteTask,
  deleteColumn,
} from "redux/boardSlice";
import { AppState, IColumn, ITask } from "types";

interface Props {
  handleClose: () => void;
  isDeleteBoard?: boolean;
  tasks?: ITask;
  name?: string;
  selectedColumn?: IColumn;
}

export default function Delete({
  handleClose,
  tasks,
  isDeleteBoard,
  name,
  selectedColumn,
}: Props) {
  const dispatch = useDispatch();
  const data: AppState = useSelector(appData);
  const { active } = data;

  const deleteBoardHandler = () => {
    dispatch(deleteBoard(active));
    handleClose();
  };
  const deleteTaskHandler = () => {
    dispatch(deleteTask(tasks));
    handleClose();
  };
  const deleteColumnHandler = () => {
    dispatch(deleteColumn(selectedColumn));
    handleClose();
  };

  return (
    <div className="p-4">
      <h1 className="text-left text-xl text-error font-bold mb-4">
        {" "}
       <span className="dark:text-white text-black"> Delete</span> {isDeleteBoard ? name : selectedColumn ? selectedColumn.name : name}
      </h1>
      <p className="text-base">
        Are you sure you want to delete this{" "} 
        <span className="font-bold text-lg ">
          {selectedColumn ? "column" :isDeleteBoard?"board":"task"}
        </span>{" "}
        ?{" "}
        <span className="ml-1">
          {isDeleteBoard
            ? "This action will remove all columns and tasks in this board."
            : selectedColumn
            ? "This action will remove all tasks from this column."
            : "This action cannot be reversed."}
        </span>
      </p>

      <div className="text-center flex items-center justify-around mt-8">
        <button

          className="py-2 w-fit md:w-40 text-white hover:bg-error px-4 rounded-md bg-error/70 font-bold"
          type="button"
          onClick={
            isDeleteBoard
              ? deleteBoardHandler
              : selectedColumn
              ? deleteColumnHandler
              : deleteTaskHandler
          }
        >
          {" "}
          Delete
        </button>
        <button
       
          className="py-2 w-fit md:w-40 font-bold hover:bg-gray bg-gray/70 duration-300 px-4 rounded-md"
          type="button"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
