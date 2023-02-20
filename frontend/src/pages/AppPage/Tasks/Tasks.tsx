import React, { useState, useEffect } from 'react';
import './tasks.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../slice/store/store';
import TodoForm from '../../../components/TodoForm/TodoForm';
import TaskElem from './TaskElem';
import { useAppDispatch } from '../../../hooks/todoHook';
import useAuth from '../../../hooks/useAuth';
import { fetchTodos, addNewTodo } from '../../../slice/todoSlice';

const Tasks = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const currentProjectId = useSelector((state: RootState) => state.projects.currentProject);

  const todos = useSelector((state: RootState) => state.todos.list.filter(
    (todo) => todo.projectId === currentProjectId,
  ));

  const { getHeaders, user: { id } } = useAuth();

  const handleAction = () => {
    if (text.trim().length) {
      dispatch(addNewTodo({
        todo: { title: text, projectId: currentProjectId, completed: false },
        headers: getHeaders(),
      }));
      setText('');
    }
  };

  useEffect(() => {
    dispatch(fetchTodos({ headers: getHeaders() }));
  }, [dispatch, id, getHeaders]);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <>
      <div className="tasks">
        <h2 className="tasks__header">Inbox</h2>
        {todos.map((taskProps) => (
          <React.Fragment key={taskProps.id}>
            <TaskElem task={taskProps} />
          </React.Fragment>
        ))}
      </div>
      <div>
        <TodoForm
          value={text}
          updateText={setText}
          handleAction={handleAction}
        />
      </div>
    </>
  );
};

export default Tasks;
