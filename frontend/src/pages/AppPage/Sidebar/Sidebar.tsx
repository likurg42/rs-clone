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
      <SidebarElem img={iconOne} title="Inbox" count="5" />
      <SidebarElem img={iconTwo} title="Today" count="9" />
      <SidebarElem img={iconThree} title="Upcoming" count="9" />
      <SidebarElem img={iconFour} title="Filters & Labels" count="9" />
    </div>

    <div className="sidebar__projects">
      <div className="sidebar__header">
        <p>Projects</p>
      </div>
      <SidebarElem img={iconFive} title="Todoist Clone" count="11" />
      <SidebarElem img={iconSix} title="Work" count="8" />
      <SidebarElem img={iconSix} title="Personal" count="7" />
    </div>
  </div>
);

export default Sidebar;
