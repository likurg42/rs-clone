import './sidebarElem.scss';
import defaultIcon from './6.svg';

type SideElemProps = {
  title: string;
  icon: string | null;
  handleClick: () => void;
  amount: number;
};

const SidebarElem = ({
  title, handleClick, icon, amount,
}: SideElemProps) => (
  <button type="button" className="sidebar__elem" onClick={handleClick}>
    <div className="sidebar__title">
      <img src={icon ?? defaultIcon} alt={title} />
      <p>{title}</p>
    </div>
    <div className="sidebar__count">{amount}</div>
  </button>
);

export default SidebarElem;
