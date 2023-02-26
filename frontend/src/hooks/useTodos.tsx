import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../slice/store';
import {
  fetchTodos, updateTodo, removeTodo, FetchTodoPayload, RemoveTodoPayload, UpdateTodoPayload,
} from '../slice/todoSlice';
import { Todo } from '../types/todoType';

interface UseTodos {
  todos: Todo[];
  fetchTodos: (payload: FetchTodoPayload) => void;
  removeTodo: (payload: RemoveTodoPayload) => void;
  updateTodo: (payload: UpdateTodoPayload) => void;
}

const useTodos = (): UseTodos => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(
    (state: RootState) => state.todos.list.filter(
      (todo) => todo.projectId === state.projects.currentProjectId,
    ),
  );

  const actions = useMemo(() => bindActionCreators(
    { fetchTodos, updateTodo, removeTodo },
    dispatch,
  ), [dispatch]);

  return {
    todos,
    ...actions,
  };
};

export default useTodos;
