export type Todo = {
  readonly id: number;
  readonly title: string;
  readonly completed: boolean;
  readonly projectId: number | null;
};

export type TodoDto = Partial<Todo>;
export type CreateTodo = Omit<Todo, 'id'>;
