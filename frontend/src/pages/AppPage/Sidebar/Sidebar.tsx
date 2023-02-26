import './sidebar.scss';
import SidebarElem from './SidebarElem';
import iconOne from './1.svg';
import { Project } from '../../../types/projectType';
import useProjects from '../../../hooks/useProjects';

type SidebarProps = {
  readonly projects: Project[];
};

const Sidebar = ({ projects }: SidebarProps) => {
  const { changeCurrentProject } = useProjects();

  const handleProjectChange = (project?: Project) => () => {
    if (project) {
      changeCurrentProject(project.id);
    } else {
      changeCurrentProject(null);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__filter">
        <SidebarElem icon={iconOne} title="Inbox" handleClick={handleProjectChange()} />
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
            handleClick={handleProjectChange(project)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
