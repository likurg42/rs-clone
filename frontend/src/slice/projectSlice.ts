import {
  createSlice, createAsyncThunk, PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes';

import { Project } from '../types/projectType';
// eslint-disable-next-line import/no-cycle
import { changeCurrentContext } from './contextSlice';
import { createSerializedError, isError, SerializedError } from './sliceUtils';

export type FetchProjectsPayload = {
  headers: { Authorization?: string; };
};

export const fetchProjects = createAsyncThunk<
  Project[],
  FetchProjectsPayload,
  { readonly rejectValue: SerializedError | Error; }
>(
  'projects/fetch',
  async ({ headers }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(routes.api.projects(), { headers });
      return data;
    } catch (e) {
      return rejectWithValue(createSerializedError(e));
    }
  },
);

export type ChangeCurrentProjectPayload = number | null;

type ProjectState = {
  readonly list: Project[];
  readonly loading: boolean;
  readonly error: string | null;
  readonly currentProjectId: ChangeCurrentProjectPayload;
};

const initialState: ProjectState = {
  list: [],
  loading: false,
  error: null,
  currentProjectId: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    changeCurrentProject: (state, action: PayloadAction<ChangeCurrentProjectPayload>) => {
      state.currentProjectId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(changeCurrentContext, (state) => {
        state.currentProjectId = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { changeCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;
