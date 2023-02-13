import React, { useState } from 'react';
import './tasks.scss';
import TodoForm from '../../../components/TodoForm/TodoForm';
import TodoList from '../../../components/TodoList/TodoList';
import TaskElem from './TaskElem';
import { useAppDispatch } from '../../../hooks/todoHook';
import { addTodo } from '../../../slice/todoSlice';

const Tasks: React.FC = () => {
  const tasks = [
    {
      id: 1,
      title: 'Download additional free apps and plugins for 💻,⌚️,🖥,📱 and 📧',
      complete: false,
    },
    {
      id: 2,
      title: 'Connect Todoist with all the tools I already use',
      complete: false,
    },
    {
      id: 3,
      title: 'How Todoists founder achieves his goals while reducing his stress 😌',
      complete: false,
    },
    {
      id: 4,
      title: 'Download additional free apps and plugins for 💻,⌚️,🖥,📱 and 📧',
      complete: false,
    },
    {
      id: 5,
      title: 'Connect Todoist with all the tools I already use',
      complete: false,
    },
    {
      id: 6,
      title: 'How Todoists founder achieves his goals while reducing his stress 😌',
      complete: false,
    },
  ];

  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const handleAction = () => {
    if (text.trim().length) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <>
      <div className="tasks">
        <h2 className="tasks__header">Inbox</h2>
        {tasks.map((taskProps) => (
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
        <TodoList />
      </div>

    </>
  );
};

export default Tasks;
