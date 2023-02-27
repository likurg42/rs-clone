export type Todo = {
  readonly id: number;
  readonly title: string;
  readonly completed: boolean;
  readonly projectId: number | null;
  readonly contextId: number | null;
};

export type CreateTodoDto = Omit<Todo, 'id'>;
export type UpdateTodoDto = Partial<CreateTodoDto>;
