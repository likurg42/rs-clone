import { useAppDispatch } from '../../hooks/todoHook';
import { toggleCompleteTodo, removeTodo } from '../../slice/todoSlice';
import '../../pages/AppPage/Tasks/taskElem.scss';

type TodoItemType = {
  readonly id: string;
  readonly title: string;
  readonly complete: boolean;
};

type TodoItemProps = {
  readonly todoItemProps: TodoItemType;
};

const TodoItem = ({ todoItemProps }: TodoItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="taskElem">
      <input
        type="checkbox"
        checked={todoItemProps.complete}
        onChange={() => dispatch(toggleCompleteTodo(todoItemProps.id))}
      />
      <p>
        {todoItemProps.title}

      </p>
      <button
        type="button"
        onClick={() => {
          dispatch(removeTodo(todoItemProps.id));
        }}
      >
        X
      </button>
    </div>
  );
};

export default TodoItem;
