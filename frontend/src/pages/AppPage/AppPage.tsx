import './appPage.scss';
import HeaderApp from './HeaderApp/HeaderApp';
import Sidebar from './Sidebar/Sidebar';
import Tasks from './Tasks/Tasks';

const TasksPage: React.FC = () => (
  <div>
    <HeaderApp />
    <div className="main-page">
      <Sidebar />
      <div className="main-tasks">
        <Tasks />
      </div>
    </div>
  </div>
);
export default TasksPage;
