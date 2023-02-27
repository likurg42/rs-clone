import { useEffect, useState } from 'react';
import { FormikProps } from 'formik';
import useProjects from '../../../hooks/useProjects';
import iconAdd from './add.svg';
import './TaskForm.scss';
import closeImg from './close.svg';
import sendImg from './send.svg';

export type TaskFormValues = {
  readonly title: string;
  readonly description: string;
  readonly projectId: number | undefined;
};

type FormProps = {
  readonly form: FormikProps<TaskFormValues>;
};

const AddTaskForm = ({ form }: FormProps) => {
  const [projectDefaultValue, setProjectDefaultValue] = useState<undefined | number>(undefined);
  const [show, setShow] = useState(false);
  const {
    handleSubmit, values, handleChange, handleBlur,
  } = form;
  const { projects, currentProjectId } = useProjects();

  console.log({ projectDefaultValue }, { values });
  useEffect(() => {
    setShow(false);
    setProjectDefaultValue(currentProjectId === null ? undefined : currentProjectId);
  }, [currentProjectId]);

  return (show ? (
    <form className="add__form" onSubmit={handleSubmit}>
      <input
        name="title"
        className="input__form"
        type="text"
        placeholder="Task name"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <textarea
        name="description"
        className="input__form"
        placeholder="Description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
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
      <p className="add__text">Add</p>
    </button>
  ));
};

export default AddTaskForm;
