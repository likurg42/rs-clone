/* eslint-disable react/button-has-type */
import './addForm.scss';
import closeImg from './close.svg';
import sendImg from './send.svg';
import SidebarElem from '../Sidebar/SidebarElem';
import iconOne from '../Sidebar/1.svg';
import iconTwo from '../Sidebar/2.svg';
import iconThree from '../Sidebar/3.svg';
import iconFour from '../Sidebar/4.svg';
import iconFive from '../Sidebar/5.svg';
import iconSix from '../Sidebar/6.svg';

const AddForm: React.FC = () => (
  <div>
    <div className="add__form">
      <input className="input__form" type="text" placeholder="Task name" />
      <input className="input__form" type="text" placeholder="Description" />
      <div className="line__form" />
      <div className="footer__form">
        <select className="select__form" name="list" id="list">
          <option>
            <SidebarElem img={iconOne} title="Inbox" count="5" />
          </option>
          <option>
            <SidebarElem img={iconTwo} title="Today" count="9" />
          </option>
          <option>
            <SidebarElem img={iconThree} title="Upcoming" count="9" />
          </option>
          <option>
            <SidebarElem img={iconFour} title="Filters & Labels" count="9" />
          </option>
          <option>
            <SidebarElem img={iconFive} title="Todoist Clone" count="11" />
          </option>
          <option>
            <SidebarElem img={iconSix} title="Work" count="8" />
          </option>
          <option>
            <SidebarElem img={iconSix} title="Personal" count="7" />
          </option>
        </select>
        <div className="input_btns">
          <button className="input_btn">
            <img src={closeImg} alt="close" />
          </button>
          <button className="input_btn">
            <img src={sendImg} alt="send" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AddForm;
