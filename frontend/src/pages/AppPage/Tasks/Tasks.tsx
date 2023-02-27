import React, { useEffect } from 'react';
import './tasks.scss';
import { FormikHelpers, useFormik } from 'formik';
import getTaskSchema from '../../../schemas/taskSchema';
import useTodos from '../../../hooks/useTodos';
import useProjects from '../../../hooks/useProjects';
import TaskElem from './TaskElem';
import TaskForm, { TaskFormValues } from '../TaskForm/TaskForm';
import useAuth from '../../../hooks/useAuth';
import useContexts from '../../../hooks/useContexts';

const Tasks = () => {
  const { currentProjectId } = useProjects();
  const { currentContextId } = useContexts();
  const { currentListViewId } = useTodos();
  const {
    fetchTodos, addNewTodo, todos, currentTitle,
  } = useTodos();
  const { getHeaders } = useAuth();

  const onSubmit = async (body: TaskFormValues, formikHelpers: FormikHelpers<TaskFormValues>) => {
    const { resetForm } = formikHelpers;
    const { title, projectId, contextId } = body;
    console.log({ body });
    addNewTodo({
      createTodoDto: {
        title,
        completed: false,
        projectId: projectId === undefined ? null : projectId,
        contextId: contextId === undefined ? null : contextId,
      },
      headers: getHeaders(),
    });
    resetForm();
  };

  const initialValues: TaskFormValues = {
    title: '',
    description: '',
    projectId: currentProjectId !== null
      && currentProjectId === currentListViewId ? currentProjectId : undefined,
    contextId: currentContextId !== null
      && currentContextId === currentListViewId ? currentContextId : undefined,
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
      <h2 className="tasks__header">{currentTitle}</h2>
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
