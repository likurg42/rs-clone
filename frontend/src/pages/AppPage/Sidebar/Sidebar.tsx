import './sidebar.scss';
import SidebarElem from './SidebarElem';
import iconOne from './1.svg';
import iconTwo from './2.svg';
import iconThree from './3.svg';
import iconFour from './4.svg';
import iconFive from './5.svg';
import iconSix from './6.svg';

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
