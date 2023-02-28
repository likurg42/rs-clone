import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { Project } from '../types/projectType';
import { RootState, useAppDispatch, useAppSelector } from '../slice/store';
import {
  changeCurrentProject,
  fetchProjects,
  FetchProjectsPayload,
  createProject,
  updateProject,
  removeProject,
  CreateProjectPayload,
  UpdateProjectPayload,
  RemoveProjectPayload,
} from '../slice/projectSlice';

interface UseProjects {
  changeCurrentProject: (payload: Project | null) => void;
  fetchProjects: (payload: FetchProjectsPayload) => void;
  createProject: (payload: CreateProjectPayload) => void;
  updateProject: (payload: UpdateProjectPayload) => void;
  removeProject: (pyaload: RemoveProjectPayload) => void;
  projects: Project[];
  currentProject: Project | undefined;
  currentProjectId: number | null;
}

const useProjects = (): UseProjects => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state: RootState) => state.projects.list);

  const currentProjectId = useAppSelector((state: RootState) => {
    if (state.projects.currentProject) {
      const { id } = state.projects.currentProject;
      return id;
    }

    return null;
  });

  const currentProject = useAppSelector((state: RootState) => state.projects.list.find(
    (project) => project.id === currentProjectId,
  ));

  const actions = useMemo(() => bindActionCreators(
    {
      changeCurrentProject,
      fetchProjects,
      createProject,
      updateProject,
      removeProject,
    },
    dispatch,
  ), [dispatch]);

  return {
    currentProject,
    currentProjectId,
    projects,
    ...actions,
  };
};

export default useProjects;
