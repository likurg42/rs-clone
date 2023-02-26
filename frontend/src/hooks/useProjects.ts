import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { Project } from '../types/projectType';
import { RootState, useAppDispatch, useAppSelector } from '../slice/store';
import {
  changeCurrentProject, ChangeCurrentProjectPayload, fetchProjects, FetchProjectsPayload,
} from '../slice/projectSlice';

interface UseProjects {
  changeCurrentProject: (payload: ChangeCurrentProjectPayload) => void;
  fetchProjects: (payload: FetchProjectsPayload) => void;
  projects: Project[];
  currentProject: Project | undefined;
  currentProjectId: number | null;
}

const useProjects = (): UseProjects => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state: RootState) => state.projects.list);

  const currentProjectId = useAppSelector((state: RootState) => state.projects.currentProjectId);

  const currentProject = useAppSelector((state: RootState) => state.projects.list.find(
    (project) => project.id === currentProjectId,
  ));

  const actions = useMemo(() => bindActionCreators(
    { changeCurrentProject, fetchProjects },
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
