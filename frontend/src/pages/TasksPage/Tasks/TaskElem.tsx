import './taskElem.scss';

type Task = {
  readonly title: string;
  readonly complete: boolean;
};

type TaskElemProps = {
  readonly taskProps: Task;
};

const TaskElem = ({ taskProps } : TaskElemProps) => (
  <div className="taskElem">
    <input type="checkbox" />
    <p>{taskProps.title}</p>
  </div>
);

export default TaskElem;
