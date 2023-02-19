export type Todo = {
  readonly id: number;
  readonly title: string;
  readonly completed: boolean;
  readonly projectId: string;
};

export type TodoDto = Partial<Todo>;
