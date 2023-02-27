import './sidebar.scss';
import useTodos from '../../../hooks/useTodos';
import SidebarElem from './SidebarElem';
import iconOne from './1.svg';
import { Project } from '../../../types/projectType';
import useProjects from '../../../hooks/useProjects';
import { Context } from '../../../types/contextType';
import useContexts from '../../../hooks/useContexts';

type SidebarProps = {
  readonly projects: Project[];
  readonly contexts: Context[];
};

const Sidebar = ({ projects, contexts }: SidebarProps) => {
  const { changeCurrentProject } = useProjects();
  const { changeCurrentContext } = useContexts();
  const { amountOfTodosInbox } = useTodos();

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

  return (
    <div className="sidebar">
      <div className="sidebar__filter">
        <SidebarElem
          icon={iconOne}
          title="Inbox"
          handleClick={handleProjectChange()}
          amount={amountOfTodosInbox}
        />
      </div>

      <div className="sidebar__projects">
        <div className="sidebar__header">
          <p>Projects</p>
        </div>
        {projects.map((project) => (
          <SidebarElem
            icon={null}
            key={project.id}
            title={project.title}
            amount={project.tasks.length}
            handleClick={handleProjectChange(project)}
          />
        ))}
        <div className="sidebar__header">
          <p>Contexts</p>
        </div>
        {contexts.map((context) => (
          <SidebarElem
            icon={null}
            key={context.id}
            title={context.title}
            amount={context.tasks.length}
            handleClick={handleContextChange(context)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
