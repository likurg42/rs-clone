import './taskElem.scss';
import { useEffect } from 'react';
// import { Checkmark12Filled, Delete16Regular } from '@fluentui/react-icons';
import { Check2, Trash3 } from 'react-bootstrap-icons';
import { removeTodo, updateTodo } from '../../../slice/todoSlice';
import useAuth from '../../../hooks/useAuth';
import { useAppDispatch } from '../../../hooks/todoHook';

type Task = {
  readonly title: string;
  readonly completed: boolean;
  readonly id: number;
};

type TaskElemProps = {
  readonly task: Task;
};

const TaskElem = ({ task }: TaskElemProps) => {
  const dispatch = useAppDispatch();
  const { getHeaders } = useAuth();

  const handleComplete = () => {
    dispatch(updateTodo({
      id: task.id,
      todoDto: {
        completed: !task.completed,
      },
      headers: getHeaders(),
    }));
  };

  const handleDelete = () => {
    dispatch(removeTodo({
      id: task.id,
      headers: getHeaders(),
    }));
  };

  useEffect(() => {
    console.log(task);
  });

  return (
    <div className="taskElem">
      <div>
        <label className="taskElem__label">
          <input className="taskElem__input" type="checkbox" onChange={handleComplete} checked={task.completed} />
          <span className="taskElem__checkbox-wrapper">
            <Check2 className="taskElem__checkbox" />
          </span>
          <p className="taskElem__title">{task.title}</p>
        </label>
      </div>
      <button className="button" type="button" onClick={handleDelete}>
        <span className="visually-hidden">Delete</span>
        <Trash3 className="trash" />
      </button>
    </div>
  );
};

export default TaskElem;
