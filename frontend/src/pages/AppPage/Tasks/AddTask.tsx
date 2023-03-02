import { FormikHelpers, useFormik } from 'formik';
import { useState, useRef, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import useContexts from '../../../hooks/useContexts';
import useProjects from '../../../hooks/useProjects';
import useTodos from '../../../hooks/useTodos';
import getTaskSchema from '../../../schemas/taskSchema';
import { CreateTodoForm } from '../../../types/taskFormType';
import iconAdd from './add.svg';
import TaskForm from './TaskForm';

const AddTask = () => {
  const [show, setShow] = useState(false);
  const { currentProjectId } = useProjects();
  const { currentContextId } = useContexts();
  const { addNewTodo } = useTodos();
  const { getHeaders } = useAuth();
  const ref = useRef<HTMLDivElement>(null);

  const onSubmit = async (body: CreateTodoForm, formikHelpers: FormikHelpers<CreateTodoForm>) => {
    const { resetForm } = formikHelpers;
    const { title, projectId, contextId } = body;
    addNewTodo({
      createTodoDto: {
        title,
        completed: false,
        projectId: projectId === undefined ? null : +projectId,
        contextId: contextId === undefined ? null : +contextId,
      },
      headers: getHeaders(),
    });
    resetForm();
  };

  const initialValues: CreateTodoForm = {
    title: '',
    projectId: currentProjectId === null ? 'default' : String(currentProjectId),
    contextId: currentContextId === null ? 'default' : String(currentContextId),
  };

  const form = useFormik({
    initialValues,
    onSubmit,
    validationSchema: getTaskSchema(),
    enableReinitialize: true,
  });

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

  return (
    <div ref={ref}>
      {show ? (<TaskForm form={form} />) : (
        <button type="button" className="add__task" onClick={() => setShow(true)}>
          <img src={iconAdd} alt="" />
          <span className="add__text">Add</span>
        </button>
      )}
    </div>
  );
};

export default AddTask;
