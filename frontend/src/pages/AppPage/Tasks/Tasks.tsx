import React, { useState, useEffect } from 'react';
import './tasks.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../slice/store/store';
import TodoForm from '../../../components/TodoForm/TodoForm';
import TaskElem from './TaskElem';
import { useAppDispatch } from '../../../hooks/todoHook';
import useAuth from '../../../hooks/useAuth';
import { fetchTodos, addNewTodo } from '../../../slice/todoSlice';

const Tasks: React.FC = () => {
  // const tasks = [
  //   {
  //     id: 1,
  //     title: 'Download additional free apps and plugins for 💻,⌚️,🖥,📱 and 📧',
  //     complete: false,
  //   },
  //   {
  //     id: 2,
  //     title: 'Connect Todoist with all the tools I already use',
  //     complete: false,
  //   },
  //   {
  //     id: 3,
  //     title: 'How Todoists founder achieves his goals while reducing his stress 😌',
  //     complete: false,
  //   },
  //   {
  //     id: 4,
  //     title: 'Download additional free apps and plugins for 💻,⌚️,🖥,📱 and 📧',
  //     complete: false,
  //   },
  //   {
  //     id: 5,
  //     title: 'Connect Todoist with all the tools I already use',
  //     complete: false,
  //   },
  //   {
  //     id: 6,
  //     title: 'How Todoists founder achieves his goals while reducing his stress 😌',
  //     complete: false,
  //   },
  // ];

  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const todos = useSelector((state: RootState) => state.todos.list);
  const { getHeaders, user: { id } } = useAuth();

  const handleAction = () => {
    if (text.trim().length) {
      dispatch(addNewTodo({ title: text, userId: id, headers: getHeaders() }));
      setText('');
    }
  };

  useEffect(() => {
    dispatch(fetchTodos({ userId: id, headers: getHeaders() }));
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
            <TaskElem taskProps={taskProps} />
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
