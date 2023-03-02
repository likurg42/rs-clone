import './sidebarElem.scss';
import { Trash2Fill } from 'react-bootstrap-icons';
import defaultIcon from './6.svg';

type SideElemProps = {
  title: string;
  icon: string | null;
  handleChange: () => void;
  amount: number;
  handleRemove?: () => void;
};

const SidebarElem = ({
  title, handleChange, icon, amount, handleRemove,
}: SideElemProps) => (
  <div role="button" className="sidebar__elem">
    <button type="button" className="sidebar__title" onClick={handleChange}>
      <img src={icon ?? defaultIcon} alt={title} />
      <p>{title}</p>
    </button>
    {handleRemove && (
      <button className="sidebar__delete-button" type="button" onClick={handleRemove}>
        <Trash2Fill />
      </button>
    )}

    <div className="sidebar__count">{amount}</div>
  </div>
);

SidebarElem.defaultProps = {
  handleRemove: undefined,
};

export default SidebarElem;
