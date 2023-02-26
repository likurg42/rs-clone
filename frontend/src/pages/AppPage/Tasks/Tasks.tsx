import React, { useState, useEffect } from 'react';
import './tasks.scss';
import useTodos from '../../../hooks/useTodos';
import useProjects from '../../../hooks/useProjects';
import TaskElem from './TaskElem';
import AddTaskForm from '../TaskForm/TaskForm';
import useAuth from '../../../hooks/useAuth';

const Tasks = () => {
  const [text, setText] = useState('');
  const { currentProject } = useProjects();
  const { fetchTodos, todos } = useTodos();
  const { getHeaders } = useAuth();

  useEffect(() => {
    fetchTodos({ headers: getHeaders() });
  }, [fetchTodos, getHeaders]);

  useEffect(() => {
    console.log(currentProject);
  }, [currentProject]);

  return (
    <div className="tasks">
      <h2 className="tasks__header">{currentProject ? currentProject.title : 'Inbox'}</h2>
      {todos && todos.map((taskProps) => (
        <React.Fragment key={taskProps.id}>
          <TaskElem task={taskProps} />
        </React.Fragment>
      ))}
      <AddTaskForm />
    </div>
  );
};

export default Tasks;
