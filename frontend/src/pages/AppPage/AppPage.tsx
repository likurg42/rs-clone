import './appPage.scss';
import { useEffect } from 'react';
import HeaderApp from './HeaderApp/HeaderApp';
import Sidebar from './Sidebar/Sidebar';
import Tasks from './Tasks/Tasks';
import { useAppDispatch, useAppSelector } from '../../hooks/todoHook';
import { fetchProjects } from '../../slice/projectSlice';
import useAuth from '../../hooks/useAuth';
import { RootState } from '../../slice/store/store';

const TasksPage = () => {
  const dispatch = useAppDispatch();
  const { getHeaders } = useAuth();
  const projects = useAppSelector((state: RootState) => state.projects.list);

  useEffect(() => {
    dispatch(fetchProjects({ headers: getHeaders() }));
  }, [dispatch, getHeaders]);

  return (
    <div>
      <HeaderApp />
      <div className="main-page">
        <Sidebar projects={projects} />
        <div className="main-tasks">
          <Tasks />
        </div>
      </div>
    </div>
  );
};
export default TasksPage;
