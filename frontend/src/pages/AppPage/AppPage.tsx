import './appPage.scss';
import { useEffect } from 'react';
import cn from 'classnames';
import useProjects from '../../hooks/useProjects';
import useTheme from '../../hooks/useTheme';
import HeaderApp from './HeaderApp/HeaderApp';
import Sidebar from './Sidebar/Sidebar';
import Tasks from './Tasks/Tasks';
import useAuth from '../../hooks/useAuth';

const AppPage = () => {
  const { theme } = useTheme();
  const { getHeaders } = useAuth();
  const { fetchProjects, projects } = useProjects();

  useEffect(() => {
    fetchProjects({ headers: getHeaders() });
  }, [fetchProjects, getHeaders]);

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
export default AppPage;
