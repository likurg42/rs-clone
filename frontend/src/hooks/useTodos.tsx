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
  fetchTodos: (payload: FetchTodoPayload) => void;
  removeTodo: (payload: RemoveTodoPayload) => void;
  updateTodo: (payload: UpdateTodoPayload) => void;
  addNewTodo: (payload: AddNewTodoPayload) => void;
}

const useTodos = (): UseTodos => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(
    (state: RootState) => state.todos.list.filter(
      (todo) => todo.projectId === state.projects.currentProjectId,
    ),
  );

  const amountOfTodosInbox = useAppSelector(
    (state: RootState) => state.todos.list.filter(
      (todo) => todo.projectId === null,
    ).length,
  );

  const actions = useMemo(() => bindActionCreators(
    {
      fetchTodos, updateTodo, removeTodo, addNewTodo,
    },
    dispatch,
  ), [dispatch]);

  return {
    todos,
    amountOfTodosInbox,
    ...actions,
  };
};

export default useTodos;
