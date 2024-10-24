export interface ITodo {
  id?: number;
  title: string;
  createDate: string;
  deadline: string;
  assignee: string;
  status: TodoStatus;    
}

export enum TodoStatus {
  pending = 1,
  completed = 2,
  outdated = 3
}

export interface IResponsiblePerson {
  id: number;
  name: string;
}