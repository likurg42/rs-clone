import React, { useEffect } from 'react';
import './tasks.scss';
import useTodos from '../../../hooks/useTodos';
import TaskElem from './TaskElem';
import useAuth from '../../../hooks/useAuth';
import AddTask from './AddTask';

const Tasks = () => {
  const {
    fetchTodos, todos, currentTitle,
  } = useTodos();
  const { getHeaders } = useAuth();

  useEffect(() => {
    fetchTodos({ headers: getHeaders() });
  }, [fetchTodos, getHeaders]);

  return (
    <div className="tasks">
      <h2 className="tasks__header">{currentTitle}</h2>
      {todos.map((taskProps) => (
        <React.Fragment key={taskProps.id}>
          <TaskElem task={taskProps} />
        </React.Fragment>
      ))}
      <AddTask />
    </div>
  );
};

export default Tasks;
