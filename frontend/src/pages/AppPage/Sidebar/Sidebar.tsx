import './sidebar.scss';
import useTodos from '../../../hooks/useTodos';
import SidebarElem from './SidebarElem';
import iconOne from './1.svg';
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
  const { changeCurrentContext } = useContexts();
  const { amountOfTodosInbox } = useTodos();
  const { getHeaders } = useAuth();

  const handleProjectChange = (project?: Project) => () => {
    if (project) {
      changeCurrentProject(project.id);
    } else {
      changeCurrentProject(null);
    }
  };

  const handleContextChange = (context: Context) => () => {
    changeCurrentContext(context.id);
  };

  const handleProjectRemove = (project: Project) => () => {
    removeProject({
      headers: getHeaders(),
      id: project.id,
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
            icon={null}
            key={project.id}
            title={project.title}
            amount={project.tasks.length}
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
            icon={null}
            key={context.id}
            title={context.title}
            amount={context.tasks.length}
            handleChange={handleContextChange(context)}
          />
        ))}
        <AddContext />
      </div>
    </div>
  );
};

export default Sidebar;
