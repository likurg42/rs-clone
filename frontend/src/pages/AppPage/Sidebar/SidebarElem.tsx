import './sidebarElem.scss';

type SideElemProps = {
  readonly img: string;
  readonly title: string;
  readonly count: string;
};

const SidebarElem: React.FC<SideElemProps> = ({ img, title, count } : SideElemProps) => (
  <div className="sidebar__elem">
    <div className="sidebar__title">
      <img src={img} alt="" />
      <p>{title}</p>
    </div>
    <div className="sidebar__count">{count}</div>
  </div>
);

export default SidebarElem;
