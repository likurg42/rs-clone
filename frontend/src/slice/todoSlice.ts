import {
  createSlice, createAsyncThunk, AnyAction, PayloadAction,
} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import routes from '../routes/routes';
import { Todo } from '../types/todoType';

type TodoState = {
  readonly list: readonly Todo[];
  readonly loading: boolean;
  readonly error: string | null;
};

export interface SerializedError {
  name: string;
  statusCode?: number;
}

export const fetchTodos = createAsyncThunk<
Todo[], { userId: number,
  headers: { Authorization?: string } }, { readonly rejectValue: SerializedError }>(
  'tasks/fetch',
  async ({ headers, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.api.tasks(String(userId)), { headers });
      const { data } = response;
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        const error:SerializedError = {
          name: e.name,
          statusCode: e?.response?.status,
        };
        return rejectWithValue(error);
      }
      return rejectWithValue(e as AxiosError);
    }
  },
);

export const addNewTodo = createAsyncThunk<
Todo, { title: string,
  userId: number, headers: { Authorization?: string } }, { readonly rejectValue: SerializedError }>(
  'tasks/add',
  async ({ title, userId, headers }, { rejectWithValue }) => {
    try {
      const todo = {
        userId,
        title,
        complete: false,
      };
      const response = await axios.post(routes.api.tasks(), todo, { headers });
      const { data } = response;
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        const error:SerializedError = {
          name: e.name,
          statusCode: e?.response?.status,
        };
        return rejectWithValue(error);
      }
      return rejectWithValue(e as AxiosError);
    }
    // const response = await fetch('/api/tasks/6', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(todo),
    // });
    // if (!response.ok) {
    //   return rejectWithValue('Error');
    // }
    // const data = (await response.json()) as Todo;
    // return data;
  },
);

export const toggleTodo = createAsyncThunk<
Todo, string, { readonly rejectValue: string, state: { todos: TodoState } }>(
  'tasks/toggle',
  async (id, { rejectWithValue, getState }) => {
    const todo = getState().todos.list.find((elem) => elem.id === id);
    if (todo) {
      const response = await fetch('http://localhost:7000/api/tasks', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          complete: !todo?.complete,
        }),
      });
      if (!response.ok) {
        return rejectWithValue('Error');
      }
      const data = (await response.json()) as Todo;
      return data;
    }
    return rejectWithValue('error');
  },
);

export const removeTodo = createAsyncThunk<string, string, { readonly rejectValue: string }>(
  'tasks/remove',
  async (id, { rejectWithValue }) => {
    const response = await fetch('http://localhost:7000/api/tasks', {
      method: 'DELETE',
    });
    if (!response.ok) {
      return rejectWithValue('Error');
    }

    return id;
  },
);

function isError(action: AnyAction) {
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
  reducers: {
  },
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
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const toggledTodo = state.list.find((todo) => todo.id === action.payload.id);
        if (toggledTodo) {
          toggledTodo.complete = !toggledTodo.complete;
        }
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((todo) => todo.id !== action.payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { addTodo, removeTodo, toggleCompleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
