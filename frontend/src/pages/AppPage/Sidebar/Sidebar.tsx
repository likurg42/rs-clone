import './sidebar.scss';
import SidebarElem from './SidebarElem';
import iconOne from './1.png';
import iconTwo from './2.png';
import iconThree from './3.png';
import iconFour from './4.png';
import iconFive from './5.png';
import iconSix from './6.png';

const Sidebar: React.FC = () => (
  <div className="sidebar">
    <div className="sidebar__filter">
      <SidebarElem test={iconOne} test2="Inbox" count="5" />
      <SidebarElem test={iconTwo} test2="Today" count="9" />
      <SidebarElem test={iconThree} test2="Upcoming" count="9" />
      <SidebarElem test={iconFour} test2="Filters & Labels" count="9" />
    </div>

    <div className="sidebar__projects">
      <div className="sidebar__header">
        <p>Projects</p>
      </div>
      <SidebarElem test={iconFive} test2="Todoist Clone" count="11" />
      <SidebarElem test={iconSix} test2="Work" count="8" />
      <SidebarElem test={iconSix} test2="Personal" count="7" />
    </div>
  </div>
);

export default Sidebar;
