import './sidebar.scss';
import useTodos from '../../../hooks/useTodos';
import SidebarElem from './SidebarElem';
import iconOne from './1.svg';
import projectIcon from './6.svg';
import contextIcon from './4.svg';
import { Project } from '../../../types/projectType';
import useProjects from '../../../hooks/useProjects';
import { Context } from '../../../types/contextType';
import useContexts from '../../../hooks/useContexts';
import AddContext from './AddContext';
import AddProject from './AddProject';
import useAuth from '../../../hooks/useAuth';

type SidebarProps = {
  readonly projects: Project[];
  readonly contexts: Context[];
};

const Sidebar = ({ projects, contexts }: SidebarProps) => {
  const { changeCurrentProject, removeProject } = useProjects();
  const { changeCurrentContext, removeContext } = useContexts();
  const { amountOfTodosInbox, todos } = useTodos();
  const { getHeaders } = useAuth();

  const handleProjectChange = (project?: Project) => () => {
    if (project) {
      changeCurrentProject(project);
    } else {
      changeCurrentProject(null);
    }
  };

  const handleContextChange = (context: Context) => () => {
    changeCurrentContext(context);
  };

  const handleProjectRemove = (project: Project) => () => {
    removeProject({
      headers: getHeaders(),
      id: project.id,
    });
  };

  const handleContextRemove = (context: Context) => () => {
    removeContext({
      headers: getHeaders(),
      id: context.id,
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebar__filter">
        <SidebarElem
          icon={iconOne}
          title="Inbox"
          handleChange={handleProjectChange()}
          amount={amountOfTodosInbox}
        />
      </div>

      <div className="sidebar__projects">
        <div className="sidebar__header">
          <p>Projects</p>
        </div>
        {projects && projects.map((project) => (
          <SidebarElem
            icon={projectIcon}
            key={project.id}
            title={project.title}
            amount={todos.filter((todoItem) => todoItem.projectId === project.id).length}
            handleChange={handleProjectChange(project)}
            handleRemove={handleProjectRemove(project)}
          />
        ))}
        <AddProject />
        <div className="sidebar__header">
          <p>Contexts</p>
        </div>
        {contexts && contexts.map((context) => (
          <SidebarElem
            icon={contextIcon}
            key={context.id}
            title={context.title}
            amount={todos.filter((todoItem) => todoItem.contextId === context.id).length}
            handleChange={handleContextChange(context)}
            handleRemove={handleContextRemove(context)}
          />
        ))}
        <AddContext />
      </div>
    </div>
  );
};

export default Sidebar;
