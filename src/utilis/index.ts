import { AppState, IBoard, ITask } from "types";
const data: IBoard[] = [];
export const loadState = () => {
  const initialState: AppState = {
    board: data,
    active: data.find((item: IBoard, index: number) => index === 0)!,
    profile: { id: "", name: "", email: "" },
  };

  try {
    const serializedState = localStorage.getItem("kanban");
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState).boarddata;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializesState = JSON.stringify(state);
    localStorage.setItem("kanban", serializesState);
  } catch (err) {
    return err;
  }
};

export const checkDuplicatedBoard = (values: IBoard, board: IBoard[]) => {
  return board.some((el: IBoard) => el.name === values.name);
};

export const checkDuplicatedColumn = () => {};

export const checkDuplicatedTask = (values: ITask, active: IBoard) => {
  let foundTask;
  active.columns.find((item) =>
    item.name === values.status
      ? item.tasks.find((t: ITask) =>
          t.title === values.title ? (foundTask = t) : null
        )
      : null
  );
  return foundTask !== undefined ? true : false;
};

export const colorSelection = () => {
  const randomNumber = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomNumber}`;
};

export const colorMarker = [
  "#FFEB3B",
  "#44c3c3",
  "#03A9F4",
  "#8bc34a",
  "#ed8936",
  "#9c27b0",
  "#8bc34a",
  "#3b61ff",
  "#03A9F4",
];
export const taskColorMarker = [
  // "#FFEB3B",
  // "#44c3c3",
  // "#03A9F4",
  // "#8bc34a",
  // "#ed8936",
  // "#9c27b0",
  // "#8bc34a",
  // "#3b61ff",
  // "#03A9F4",
  " #ed8936",
  "#48bb78",
  "#9c27b0",
  "#3b61ff",
  "#ed8936",
  "#44c3c3",
  "#9c27b0",
  "#ff380b",
  "#03A9F4",
  "#8bc34a",
];
