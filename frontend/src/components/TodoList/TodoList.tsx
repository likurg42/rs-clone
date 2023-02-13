import React from 'react';
import { useAppSelector } from '../../hooks/todoHook';
import TodoItem from '../TodoItem/TodoItem';

const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos.list);

  return (
    <div>
      {todos.map((todo) => (
        <React.Fragment key={todo.id}>
          <TodoItem todoItemProps={todo} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default TodoList;
