interface TodoFormProps {
  readonly value: string;
  readonly updateText: (str: string) => void;
  readonly handleAction: () => void;
}

const TodoForm = ({
  value,
  updateText,
  handleAction,
}: TodoFormProps) => (
  <label>
    <input
      placeholder="new Todo"
      value={value}
      onChange={(e) => updateText(e.target.value)}
    />
    <button type="button" onClick={handleAction}>Add todo</button>
  </label>
);

export default TodoForm;
