import { FormikProps } from 'formik';
import './TaskForm.scss';
import { useEffect } from 'react';
import sendImg from './send.svg';
import useProjects from '../../../hooks/useProjects';
import useContexts from '../../../hooks/useContexts';
import { CreateTodoForm } from '../../../types/taskFormType';

type FormProps = {
  readonly form: FormikProps<CreateTodoForm>;
};

const TaskForm = ({ form }: FormProps) => {
  const {
    handleSubmit, values, handleChange, handleBlur,
  } = form;
  const { projects } = useProjects();
  const { contexts } = useContexts();

  useEffect(() => {
    console.log(values);
  });

  return (
    <form className="add__form" onSubmit={handleSubmit}>
      <input
        name="title"
        className="input__form"
        type="text"
        placeholder="Task name"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
      />
      <div className="line__form" />
      <div className="footer__form">
        <select
          className="select__form"
          name="projectId"
          value={values.projectId}
          onChange={handleChange}
        >
          <option value="default">Inbox</option>
          {projects && projects.map(({ title, id }) => (
            <option value={id} key={id}>{title}</option>
          ))}
        </select>
        <select
          className="select__form"
          name="contextId"
          value={values.contextId}
          onChange={handleChange}
        >
          <option value="default">No context</option>
          {contexts && contexts.map(({ title, id }) => (
            <option value={id} key={id}>{title}</option>
          ))}
        </select>
        <div className="input_btns">
          <button
            type="submit"
            className="input_btn"
          >
            <img src={sendImg} alt="send" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
