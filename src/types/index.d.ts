export interface IBoard {
  id: string;
  name: string;
  columns: IColumn[];
}

export interface IColumn {
  name: string;
  id: string;
  tasks: ITask[];
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: ISubTask[];
}

export interface ISubTask {
  id: string;
  title: string;
  isCompleted: boolean;
}
export interface IProfile {
  id: string;
  name: string;
  email: string;
}

type AppState = {
  board: IBoard[];
  active: IBoard;
  profile: IProfile;
};
