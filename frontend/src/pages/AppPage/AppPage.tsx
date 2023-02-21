import './appPage.scss';
import { useEffect } from 'react';
import cn from 'classnames';
import useTheme from '../../hooks/useTheme';
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

  const { theme } = useTheme();

  const themeClass = cn('full-page', {
    [`theme-${theme}`]: theme,
  });

  return (
    <div className={themeClass}>
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
