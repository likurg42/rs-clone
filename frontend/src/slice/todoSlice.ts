import {
  createSlice, createAsyncThunk, AnyAction, PayloadAction,
} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import routes from '../routes/routes';
import { CreateTodo, Todo, TodoDto } from '../types/todoType';

type TodoState = {
  readonly list: readonly Todo[];
  readonly loading: boolean;
  readonly error: string | null;
};

export interface SerializedError {
  name: string;
  statusCode?: number;
}

export const createSerializedError = (e: unknown): SerializedError => {
  if (e instanceof AxiosError) {
    return {
      name: e.name,
      statusCode: e?.response?.status,
    };
  }

  if (e instanceof Error) return { name: e.name };

  return {
    name: 'Unknown Error',
  };
};

export const fetchTodos = createAsyncThunk<
  Todo[],
  {
    headers: { Authorization?: string }
  },
  { readonly rejectValue: SerializedError | Error }
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

export const addNewTodo = createAsyncThunk<
  Todo,
  {
    todo: CreateTodo,
    headers: { Authorization?: string },
  },
  { readonly rejectValue: SerializedError | Error }
>(
  'tasks/add',
  async ({ todo, headers }, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.api.tasks(), todo, { headers });
      const { data } = response;
      return data;
    } catch (e) {
      return rejectWithValue(createSerializedError(e));
    }
  },
);

export const updateTodo = createAsyncThunk<
  Todo,
  {
    id: number,
    todoDto: TodoDto,
    headers: { Authorization?: string },
  },
  { readonly rejectValue: SerializedError }
>(
  'tasks/toggle',
  async ({ id, todoDto, headers }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(routes.api.task(String(id)), todoDto, { headers });
      const [, [todo]] = response.data;
      return todo;
    } catch (e) {
      return rejectWithValue(createSerializedError(e));
    }
  },
);

export const removeTodo = createAsyncThunk<
  number,
  {
    id: number,
    headers: { Authorization?: string },
  },
  { readonly rejectValue: SerializedError }
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

export function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

const initialState: TodoState = {
  list: [],
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
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.loading = false;
      })
      .addCase(updateTodo.fulfilled, (state, { payload }) => {
        const { id } = payload;
        state.list = state.list.map((item) => (item.id === id ? payload : item));
      })
      .addCase(removeTodo.fulfilled, (state, { payload }) => {
        state.list = state.list.filter((task) => task.id !== payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default todoSlice.reducer;
