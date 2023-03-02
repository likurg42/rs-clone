import {
  createSlice, createAsyncThunk, PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes';

import {
  CreateProjectDto, NewProject, Project, UpdateProjectDto,
} from '../types/projectType';
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

export type CreateProjectPayload = {
  createProjectDto: CreateProjectDto;
  headers: { Authorization?: string; },
};

export const createProject = createAsyncThunk<
  NewProject,
  CreateProjectPayload,
  { readonly rejectValue: SerializedError | Error; }
>(
  'projects/add',
  async ({ createProjectDto, headers }, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.api.projects(), createProjectDto, { headers });
      const { data } = response;
      return data;
    } catch (e) {
      return rejectWithValue(createSerializedError(e));
    }
  },
);

export type UpdateProjectPayload = {
  id: number,
  updateProjectDto: UpdateProjectDto,
  headers: { Authorization?: string; },
};

export const updateProject = createAsyncThunk<
  Project,
  UpdateProjectPayload,
  { readonly rejectValue: SerializedError; }
>(
  'projects/update',
  async ({ id, updateProjectDto, headers }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        routes.api.project(String(id)),
        updateProjectDto,
        { headers },
      );

      const [, [project]] = response.data;
      return project;
    } catch (e) {
      return rejectWithValue(createSerializedError(e));
    }
  },
);

export type RemoveProjectPayload = {
  id: number,
  headers: { Authorization?: string; },
};

export const removeProject = createAsyncThunk<
  number,
  RemoveProjectPayload,
  { readonly rejectValue: SerializedError; }
>(
  'projects/remove',
  async ({ id, headers }, { rejectWithValue }) => {
    try {
      await axios.delete(routes.api.project(String(id)), { headers });
      return id;
    } catch (e) {
      return rejectWithValue(createSerializedError(e));
    }
  },
);

type ProjectState = {
  readonly list: Project[];
  readonly loading: boolean;
  readonly error: string | null;
  readonly currentProject: Project | null;
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
    changeCurrentProject: (state, action: PayloadAction<Project | null>) => {
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
      .addCase(createProject.pending, (state) => {
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, { payload: newProject }) => {
        const project: Project = { ...newProject, tasks: [] };
        state.list.push(project);
        state.currentProject = project;
      })
      .addCase(updateProject.fulfilled, (state, { payload: todo }) => {
        const { id } = todo;
        state.list = state.list.map((item) => (item.id === id ? todo : item));
      })
      .addCase(removeProject.fulfilled, (state, { payload }) => {
        state.list = state.list.filter((task) => task.id !== payload);
        state.currentProject = null;
      })
      .addCase(changeCurrentContext, (state) => {
        state.currentProject = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { changeCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;
