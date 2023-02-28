import {
  createSlice, createAsyncThunk, PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes';
import {
  Context, CreateContextDto, UpdateContextDto, NewContext,
} from '../types/contextType';
// eslint-disable-next-line import/no-cycle
import { changeCurrentProject } from './projectSlice';
import { createSerializedError, isError, SerializedError } from './sliceUtils';

export type FetchContextPayload = {
  headers: { Authorization?: string; };
};

export const fetchContexts = createAsyncThunk<
  Context[],
  FetchContextPayload,
  { readonly rejectValue: SerializedError | Error; }
>(
  'context/fetch',
  async ({ headers }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(routes.api.contexts(), { headers });
      return data;
    } catch (e) {
      return rejectWithValue(createSerializedError(e));
    }
  },
);

export type CreateContextPayload = {
  createContextDto: CreateContextDto;
  headers: { Authorization?: string; },
};

export const createContext = createAsyncThunk<
  NewContext,
  CreateContextPayload,
  { readonly rejectValue: SerializedError | Error; }
>(
  'context/add',
  async ({ createContextDto, headers }, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.api.contexts(), createContextDto, { headers });
      const { data } = response;
      return data;
    } catch (e) {
      return rejectWithValue(createSerializedError(e));
    }
  },
);

export type UpdateContextPayload = {
  id: number,
  updateContextDto: UpdateContextDto,
  headers: { Authorization?: string; },
};

export const updateContext = createAsyncThunk<
  Context,
  UpdateContextPayload,
  { readonly rejectValue: SerializedError; }
>(
  'context/update',
  async ({ id, updateContextDto, headers }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        routes.api.context(String(id)),
        updateContextDto,
        { headers },
      );

      const [, [context]] = response.data;
      return context;
    } catch (e) {
      return rejectWithValue(createSerializedError(e));
    }
  },
);

export type RemoveContextPayload = {
  id: number,
  headers: { Authorization?: string; },
};

export const removeContext = createAsyncThunk<
  number,
  RemoveContextPayload,
  { readonly rejectValue: SerializedError; }
>(
  'context/remove',
  async ({ id, headers }, { rejectWithValue }) => {
    try {
      await axios.delete(routes.api.context(String(id)), { headers });
      return id;
    } catch (e) {
      return rejectWithValue(createSerializedError(e));
    }
  },
);

export type CurrentContext = Context | null;

type ContextState = {
  readonly list: Context[];
  readonly loading: boolean;
  readonly error: string | null;
  readonly currentContext: CurrentContext;
};

const initialState: ContextState = {
  list: [],
  loading: false,
  error: null,
  currentContext: null,
};

const contextSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    changeCurrentContext: (state, action: PayloadAction<Context>) => {
      state.currentContext = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContexts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContexts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(createContext.pending, (state) => {
        state.error = null;
      })
      .addCase(createContext.fulfilled, (state, { payload: newContext }) => {
        const context: Context = { ...newContext, tasks: [] };
        state.list.push(context);
        state.currentContext = context;
      })
      .addCase(updateContext.fulfilled, (state, { payload: context }) => {
        const { id } = context;
        state.list = state.list.map((item) => (item.id === id ? context : item));
      })
      .addCase(removeContext.fulfilled, (state, { payload: id }) => {
        state.list = state.list.filter((task) => task.id !== id);
        state.currentContext = null;
      })
      .addCase(changeCurrentProject, (state) => {
        state.currentContext = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { changeCurrentContext } = contextSlice.actions;

export default contextSlice.reducer;
