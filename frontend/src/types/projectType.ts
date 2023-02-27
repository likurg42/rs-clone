import { Todo } from './todoType';

export type Project = {
  id: number;
  title: string;
  tasks: Todo[];
};

export type InboxProject = {
  title: 'Inbox';
};
