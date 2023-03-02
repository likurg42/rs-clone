import './appPage.scss';
import { useEffect } from 'react';
import cn from 'classnames';
import useProjects from '../../hooks/useProjects';
import useTheme from '../../hooks/useTheme';
import HeaderApp from './HeaderApp/HeaderApp';
import Sidebar from './Sidebar/Sidebar';
import Tasks from './Tasks/Tasks';
import useAuth from '../../hooks/useAuth';
import useContexts from '../../hooks/useContexts';
import useTodos from '../../hooks/useTodos';

const AppPage = () => {
  const { theme } = useTheme();
  const { getHeaders } = useAuth();
  const { fetchTodos } = useTodos();
  const { fetchProjects, projects } = useProjects();
  const { fetchContexts, contexts } = useContexts();

  useEffect(() => {
    fetchProjects({ headers: getHeaders() });
    fetchContexts({ headers: getHeaders() });
    fetchTodos({ headers: getHeaders() });
  }, [fetchProjects, fetchContexts, getHeaders, fetchTodos]);

  const themeClass = cn('full-page', {
    [`theme-${theme}`]: theme,
  });

  return (
    <div className={themeClass}>
      <HeaderApp />
      <div className="main-page">
        <Sidebar projects={projects} contexts={contexts} />
        <div className="main-tasks">
          <Tasks />
        </div>
      </div>
    </div>
  );
};
export default AppPage;
