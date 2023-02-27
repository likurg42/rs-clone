import { useEffect, useState, useRef } from 'react';
import { FormikProps } from 'formik';
import useProjects from '../../../hooks/useProjects';
import iconAdd from './add.svg';
import './TaskForm.scss';
import closeImg from './close.svg';
import sendImg from './send.svg';
import useContexts from '../../../hooks/useContexts';

export type TaskFormValues = {
  readonly title: string;
  readonly description: string;
  readonly projectId: number | undefined;
  readonly contextId: number | undefined;
};

type FormProps = {
  readonly form: FormikProps<TaskFormValues>;
};

const AddTaskForm = ({ form }: FormProps) => {
  const [show, setShow] = useState(false);
  const {
    handleSubmit, values, handleChange, handleBlur,
  } = form;
  const { projects, currentProjectId } = useProjects();
  const { contexts, currentContextId } = useContexts();
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setShow(false);
  }, [currentProjectId, currentContextId]);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (event.target && ref.current && !ref.current.contains((event.target as Node))) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (show ? (
    <form className="add__form" onSubmit={handleSubmit} ref={ref}>
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
          <option value={undefined}>Inbox</option>
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
          <option value={undefined}>No context</option>
          {contexts && contexts.map(({ title, id }) => (
            <option value={id} key={id}>{title}</option>
          ))}
        </select>
        <div className="input_btns">
          <button
            type="button"
            className="input_btn"
            onClick={() => {
              setShow(false);
            }}
          >
            <img src={closeImg} alt="close" />
          </button>
          <button
            type="submit"
            className="input_btn"
          >
            <img src={sendImg} alt="send" />
          </button>
        </div>
      </div>
    </form>
  ) : (
    <button type="button" className="add__task" onClick={() => setShow(true)}>
      <img src={iconAdd} alt="" />
      <span className="add__text">Add</span>
    </button>
  ));
};

export default AddTaskForm;
