export interface IBoard {
  id:string,
  name: string;
  columns: {
    id:string,
    name: string;
    tasks: {
      id:string,
      title: string;
      description: string;
      status: string;
      subtasks: {  id:string,
        title: string;
        isCompleted: boolean;
      }[];
    }[];
  }[];
}

export interface IColumn {
  name: string;
  id:string,
  tasks: {
    id:string,
    title: string;
    description: string;
    status: string;
    subtasks: {
      id:string,
      title: string;
      isCompleted: boolean;
    }[];
  }[];
}

export interface ITask {
  id:string,
  title: string;
  description: string;
  status: string;
  subtasks: {
    id:string,
    title: string;
    isCompleted: boolean;
  }[];
}

export interface ISubTask {
  id:string,
  title: string;
  isCompleted: boolean;
}
export interface IProfile {
  id:string,
  name: string;
 email: string;
}

type AppState = {
  board: IBoard[];
  active: IBoard;
  profile:IProfile
};
