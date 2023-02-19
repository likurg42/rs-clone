import iconAdd from './add.svg';
import AddForm from './AddForm';
import './addTask.scss';

const AddTask: React.FC = () => (
  <div>
    <div className="add__task">
      <img src={iconAdd} alt="" />
      <p className="add__text">Add</p>
    </div>
    <AddForm />
  </div>
);

export default AddTask;
