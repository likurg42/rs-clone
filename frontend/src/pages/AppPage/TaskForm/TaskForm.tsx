import iconAdd from './add.svg';
// import AddForm from './AddForm';
import './addTask.scss';

const AddTaskForm = () => (
  <div>
    <div className="add__task">
      <img src={iconAdd} alt="" />
      <p className="add__text">Add</p>
    </div>
    {/* <AddForm /> */}
  </div>
);

export default AddTaskForm;
