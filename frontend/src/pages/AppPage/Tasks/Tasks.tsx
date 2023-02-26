import React, { useEffect } from 'react';
import './tasks.scss';
import { FormikHelpers, useFormik } from 'formik';
import getTaskSchema from '../../../schemas/taskSchema';
import useTodos from '../../../hooks/useTodos';
import useProjects from '../../../hooks/useProjects';
import TaskElem from './TaskElem';
import TaskForm, { TaskFormValues } from '../TaskForm/TaskForm';
import useAuth from '../../../hooks/useAuth';

const Tasks = () => {
  const { currentProject, currentProjectId } = useProjects();
  const { fetchTodos, addNewTodo, todos } = useTodos();
  const { getHeaders } = useAuth();

  const onSubmit = async (body: TaskFormValues, formikHelpers: FormikHelpers<TaskFormValues>) => {
    const { resetForm } = formikHelpers;
    const { title, projectId } = body;
    console.log({ body });
    try {
      await addNewTodo({
        todo: {
          title,
          completed: false,
          projectId: projectId === undefined ? null : projectId,
        },
        headers: getHeaders(),
      });
      resetForm();
    } catch (e) {
      console.log(e);
    }
  };

  const initialValues: TaskFormValues = {
    title: '',
    description: '',
    projectId: currentProjectId === null ? undefined : currentProjectId,
  };

  const form = useFormik({
    initialValues,
    onSubmit,
    validationSchema: getTaskSchema(),
    enableReinitialize: true,
  });

  useEffect(() => {
    fetchTodos({ headers: getHeaders() });
  }, [fetchTodos, getHeaders]);

  return (
    <div className="tasks">
      <h2 className="tasks__header">{currentProject ? currentProject.title : 'Inbox'}</h2>
      {todos.map((taskProps) => (
        <React.Fragment key={taskProps.id}>
          <TaskElem task={taskProps} />
        </React.Fragment>
      ))}
      <TaskForm form={form} />
    </div>
  );
};

export default Tasks;
