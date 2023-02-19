import './taskElem.scss';
import { useEffect } from 'react';
import { Delete16Regular } from '@fluentui/react-icons';
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
      <input type="checkbox" onChange={handleComplete} checked={task.completed} />
      <p>{task.title}</p>
      <button className="button" type="button" onClick={handleDelete}>
        <span className="visually-hidden">Delete</span>
        <Delete16Regular />
      </button>
    </div>
  );
};

export default TaskElem;
