import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/todoType';

type TodoState = {
  readonly list: readonly Todo[];
};

const initialState: TodoState = {
  list: [],
};
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.list.push({
        id: new Date().toISOString(),
        title: action.payload,
        complete: false,
      });
    },

    removeTodo(state, action: PayloadAction<string>) {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },

    toggleCompleteTodo(state, action: PayloadAction<string>) {
      const toggledTodo = state.list.find((todo) => todo.id === action.payload);
      if (toggledTodo) {
        toggledTodo.complete = !toggledTodo.complete;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleCompleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
