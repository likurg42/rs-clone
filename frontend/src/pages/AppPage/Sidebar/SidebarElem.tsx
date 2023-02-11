import './sidebarElem.scss';

const SidebarElem: React.FC = ({test, test2, count}) => (
  <div className="sidebar__elem">
    <div className="sidebar__title">
      <img src={test} alt="" />
      <p>{test2}</p>
    </div>
    <div className="sidebar__count">{count}</div>
  </div>
);

export default SidebarElem;
