import {
  createSlice, createAsyncThunk, PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes/routes';
import { CreateTodoDto, Todo, UpdateTodoDto } from '../types/todoType';
import { changeCurrentContext, createContext, removeContext } from './contextSlice';
import { changeCurrentProject, createProject, removeProject } from './projectSlice';
import { createSerializedError, isError, SerializedError } from './sliceUtils';

type CurrentListView = {
  property: keyof Todo;
  id: number | null;
  title: string;
};

type TodoState = {
  readonly list: Todo[];
  readonly currentList: Todo[];
  readonly currentListView: CurrentListView;
  readonly loading: boolean;
  readonly error: string | null;
};

export type FetchTodoPayload = {
  headers: { Authorization?: string; };
};

export const fetchTodos = createAsyncThunk<
  Todo[],
  FetchTodoPayload,
  { readonly rejectValue: SerializedError | Error; }
>(
  'tasks/fetch',
  async ({ headers }, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.api.tasks(), { headers });
      const { data } = response;
      return data;
    } catch (e) {
      return rejectWithValue(createSerializedError(e));
    }
  },
);

export type AddNewTodoPayload = {
  createTodoDto: CreateTodoDto,
  headers: { Authorization?: string; },
};

export const addNewTodo = createAsyncThunk<
  Todo,
  AddNewTodoPayload,
  { readonly rejectValue: SerializedError | Error; }
>(
  'tasks/add',
  async ({ createTodoDto, headers }, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.api.tasks(), createTodoDto, { headers });
      const { data } = response;
      return data;
    } catch (e) {
      return rejectWithValue(createSerializedError(e));
    }
  },
);

export type UpdateTodoPayload = {
  id: number,
  updateTodoDto: UpdateTodoDto,
  headers: { Authorization?: string; },
};

export const updateTodo = createAsyncThunk<
  Todo,
  UpdateTodoPayload,
  { readonly rejectValue: SerializedError; }
>(
  'tasks/update',
  async ({ id, updateTodoDto, headers }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(routes.api.task(String(id)), updateTodoDto, { headers });
      const [, [todo]] = response.data;
      return todo;
    } catch (e) {
      return rejectWithValue(createSerializedError(e));
    }
  },
);

export type RemoveTodoPayload = {
  id: number,
  headers: { Authorization?: string; },
};

export const removeTodo = createAsyncThunk<
  number,
  RemoveTodoPayload,
  { readonly rejectValue: SerializedError; }
>(
  'tasks/remove',
  async ({ id, headers }, { rejectWithValue }) => {
    try {
      await axios.delete(routes.api.task(String(id)), { headers });
      return id;
    } catch (e) {
      return rejectWithValue(createSerializedError(e));
    }
  },
);

const initialState: TodoState = {
  list: [],
  currentList: [],
  currentListView: {
    property: 'projectId',
    id: null,
    title: 'Inbox',
  },
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, { payload: todos }) => {
        state.list = todos;
        state.currentList = todos.filter((todo) => todo.projectId === null);
        state.loading = false;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(addNewTodo.fulfilled, (state, { payload: todo }) => {
        state.list.push(todo);
        if (todo[state.currentListView.property] === state.currentListView.id) {
          state.currentList.push(todo);
        }
      })
      .addCase(updateTodo.fulfilled, (state, { payload: todo }) => {
        const { id } = todo;
        state.list = state.list.map((item) => (item.id === id ? todo : item));
        state.currentList = state.list.filter(
          (todoItem) => todoItem[state.currentListView.property] === state.currentListView.id,
        );
      })
      .addCase(removeTodo.fulfilled, (state, { payload }) => {
        state.list = state.list.filter((task) => task.id !== payload);
        state.currentList = state.currentList.filter((task) => task.id !== payload);
      })
      .addCase(createProject.fulfilled, (state, { payload: project }) => {
        const { id, title } = project;
        state.currentList = [];
        state.currentListView = {
          id,
          property: 'projectId',
          title,
        };
      })
      .addCase(removeProject.fulfilled, (state) => {
        state.currentList = state.list.filter((todo) => todo.projectId === null);
        state.currentListView = initialState.currentListView;
      })
      .addCase(createContext.fulfilled, (state, { payload }) => {
        state.currentList = [];
        state.currentListView = {
          id: payload.id,
          property: 'contextId',
          title: payload.title,
        };
      })
      .addCase(removeContext.fulfilled, (state) => {
        state.currentList = state.list.filter((todo) => todo.projectId === null);
        state.currentListView = initialState.currentListView;
      })
      /* Change current View */
      .addCase(changeCurrentContext, (state, { payload: context }) => {
        if (context) {
          const { id, title } = context;
          console.log(id);
          state.currentList = state.list.filter((task) => task.contextId === id);
          state.currentListView = {
            property: 'contextId',
            id,
            title,
          };
        }
      })
      .addCase(changeCurrentProject, (state, { payload: currentProject }) => {
        if (currentProject) {
          const { id, title } = currentProject;
          state.currentList = state.list.filter((task) => task.projectId === id);
          state.currentListView = {
            property: 'projectId',
            id,
            title,
          };
        } else {
          state.currentListView = initialState.currentListView;
          state.currentList = state.list.filter((todoItem) => todoItem.projectId === null);
        }
      })
      /***/
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default todoSlice.reducer;
