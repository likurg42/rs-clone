import {
  createSlice, createAsyncThunk, PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes';

import { Project } from '../types/projectType';
import { createSerializedError, isError, SerializedError } from './todoSlice';

export const fetchProjects = createAsyncThunk<
  Project[],
  {
    headers: { Authorization?: string }
  },
  { readonly rejectValue: SerializedError | Error }
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

type ProjectState = {
  readonly list: Project[];
  readonly loading: boolean;
  readonly error: string | null;
  readonly currentProject: number | null;
};

const initialState: ProjectState = {
  list: [],
  loading: false,
  error: null,
  currentProject: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    changeCurrentProject: (state, action: PayloadAction<number | null>) => {
      console.log(action.payload);
      state.currentProject = action.payload;
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
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { changeCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;
