import {
  createSlice, createAsyncThunk, PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes';
import { Context } from '../types/contextType';
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

export type CurrentContextId = number | null;

type ContextState = {
  readonly list: Context[];
  readonly loading: boolean;
  readonly error: string | null;
  readonly currentContextId: CurrentContextId;
};

const initialState: ContextState = {
  list: [],
  loading: false,
  error: null,
  currentContextId: null,
};

const contextSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    changeCurrentContext: (state, action: PayloadAction<CurrentContextId>) => {
      state.currentContextId = action.payload;
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
      .addCase(changeCurrentProject, (state) => {
        state.currentContextId = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { changeCurrentContext } = contextSlice.actions;

export default contextSlice.reducer;
