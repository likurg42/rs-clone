import './sidebar.scss';
import SidebarElem from './SidebarElem';
import iconOne from './1.svg';
import { Project } from '../../../types/projectType';
import { useAppDispatch } from '../../../hooks/todoHook';
import { changeCurrentProject } from '../../../slice/projectSlice';

type SidebarProps = {
  readonly projects: Project[]
};

const Sidebar = ({ projects }: SidebarProps) => {
  const dispatch = useAppDispatch();

  const handleProjectChange = (project?: Project) => () => {
    if (project) {
      dispatch(changeCurrentProject(project.id));
    } else {
      dispatch(changeCurrentProject(null));
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
