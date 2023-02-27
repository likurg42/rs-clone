import { Todo } from './todoType';

export type Context = {
  id: number;
  title: string;
  tasks: Todo[];
};

export type NewContext = Omit<Context, 'tasks'>;
export type CreateContextDto = Omit<Context, 'id' | 'tasks'>;
export type UpdateContextDto = Partial<CreateContextDto>;
