import React from 'react';
import './tasks.scss';
import useTodos from '../../../hooks/useTodos';
import TaskElem from './TaskElem';
import AddTask from './AddTask';

const Tasks = () => {
  const {
    todos, currentTitle,
  } = useTodos();

  return (
    <div className="tasks">
      <h2 className="tasks__header">{currentTitle}</h2>
      {todos && todos.map((taskProps) => (
        <React.Fragment key={taskProps.id}>
          <TaskElem task={taskProps} />
        </React.Fragment>
      ))}
      <AddTask />
    </div>
  );
};

export default Tasks;
