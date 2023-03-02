import { Todo } from './todoType';

export type Project = {
  id: number;
  title: string;
  tasks: Todo[];
};

export type NewProject = Omit<Project, 'tasks'>;

export type InboxProject = {
  title: 'Inbox';
};

export type CreateProjectDto = Omit<Project, 'id' | 'tasks'>;
export type UpdateProjectDto = Partial<CreateProjectDto>;
