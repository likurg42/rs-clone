import { useState, useEffect, useRef } from 'react';
import './taskElem.scss';
import { Check2, Trash3, PencilSquare } from 'react-bootstrap-icons';
import { FormikHelpers, useFormik } from 'formik';
import useTodos from '../../../hooks/useTodos';
import useAuth from '../../../hooks/useAuth';
import TaskForm from './TaskForm';
import { CreateTodoForm } from '../../../types/taskFormType';
import useProjects from '../../../hooks/useProjects';
import useContexts from '../../../hooks/useContexts';
import getTaskSchema from '../../../schemas/taskSchema';
import { Todo } from '../../../types/todoType';

type TaskElemProps = {
  readonly task: Todo;
};

const TaskElem = ({ task }: TaskElemProps) => {
  const [show, setShow] = useState(false);
  const { updateTodo, removeTodo, currentListViewId } = useTodos();
  const { getHeaders } = useAuth();
  const { currentProjectId } = useProjects();
  const { currentContextId } = useContexts();
  const ref = useRef<HTMLDivElement>(null);

  const handleComplete = () => {
    updateTodo({
      id: task.id,
      updateTodoDto: {
        completed: !task.completed,
      },
      headers: getHeaders(),
    });
  };

  const handleDelete = () => {
    removeTodo({
      id: task.id,
      headers: getHeaders(),
    });
  };

  const handleUpdate = () => setShow(true);

  const onSubmit = async (body: CreateTodoForm, formikHelpers: FormikHelpers<CreateTodoForm>) => {
    const { resetForm } = formikHelpers;
    const { title, projectId, contextId } = body;
    console.log({ body });
    updateTodo({
      id: task.id,
      updateTodoDto: {
        title,
        projectId: projectId === 'default' ? null : +projectId,
        contextId: contextId === 'default' ? null : +contextId,
      },
      headers: getHeaders(),
    });
    setShow(false);
    resetForm();
  };

  const initialValues: CreateTodoForm = {
    title: task.title,
    projectId: task.projectId === null ? 'default' : String(task.projectId),
    contextId: task.contextId === null ? 'default' : String(task.contextId),
  };

  const form = useFormik({
    initialValues,
    onSubmit,
    validationSchema: getTaskSchema(),
    enableReinitialize: true,
  });

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

  return (
    <div ref={ref}>
      {show ? (
        <TaskForm form={form} />
      ) : (
        <div className="taskElem">
          <div className="taskElem__wrapper">
            <label className="taskElem__label">
              <input className="taskElem__input" type="checkbox" onChange={handleComplete} checked={task.completed} />
              <span className="taskElem__checkbox-wrapper">
                <Check2 className="taskElem__checkbox" />
              </span>
              <p className="taskElem__title">{task.title}</p>
            </label>
          </div>
          <button className="button" type="button" onClick={handleUpdate}>
            <span className="visually-hidden">Update</span>
            <PencilSquare />
          </button>
          <button className="button" type="button" onClick={handleDelete}>
            <span className="visually-hidden">Delete</span>
            <Trash3 className="trash" />
          </button>
        </div>
      )}
    </div>

  );
};

export default TaskElem;
