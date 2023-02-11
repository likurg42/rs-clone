import './tasksPage.scss';
import HeaderTasks from './HeaderTasks/HeaderTasks';
import Sidebar from './Sidebar/Sidebar';
import Tasks from './Tasks/Tasks';

const TasksPage: React.FC = () => (
  <div>
    <HeaderTasks />
    <div className="main-page">
      <Sidebar />
      <div className="main-tasks">
        <Tasks />
      </div>
    </div>
  </div>
);
export default TasksPage;
