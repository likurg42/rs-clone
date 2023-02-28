import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../slice/store';
import {
  fetchTodos,
  addNewTodo,
  AddNewTodoPayload,
  updateTodo,
  removeTodo,
  FetchTodoPayload,
  RemoveTodoPayload,
  UpdateTodoPayload,
} from '../slice/todoSlice';
import { Todo } from '../types/todoType';

interface UseTodos {
  todos: Todo[];
  amountOfTodosInbox: number;
  currentTitle: string;
  currentListViewId: number | null;
  fetchTodos: (payload: FetchTodoPayload) => void;
  removeTodo: (payload: RemoveTodoPayload) => void;
  updateTodo: (payload: UpdateTodoPayload) => void;
  addNewTodo: (payload: AddNewTodoPayload) => void;
}

const useTodos = (): UseTodos => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(
    (state: RootState) => state.todos.currentList,
  );

  const amountOfTodosInbox = useAppSelector(
    (state: RootState) => state.todos.list.filter(
      (todo) => todo.projectId === null,
    ).length,
  );

  const currentTitle = useAppSelector(
    (state: RootState) => {
      const { currentListView } = state.todos;
      return currentListView.title ?? 'Inbox';
    },
  );

  const currentListViewId = useAppSelector((state) => state.todos.currentListView.id);

  const actions = useMemo(() => bindActionCreators(
    {
      fetchTodos, updateTodo, removeTodo, addNewTodo,
    },
    dispatch,
  ), [dispatch]);

  return {
    todos,
    amountOfTodosInbox,
    currentTitle,
    currentListViewId,
    ...actions,
  };
};

export default useTodos;
