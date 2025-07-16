export interface ICreateTodo {
  task: string;
  dueDate: string;
  completed: boolean;
}

export interface ITodo extends ICreateTodo {
  id: number;
}
