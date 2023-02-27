import { Todo } from './todoType';

export type Context = {
  id: number;
  title: string;
  tasks: Todo[];
};

export type CreateContextDto = Omit<Todo, 'id'>;
export type UpdateContextDto = Partial<CreateContextDto>;
