import {
  useCallback, useState, useRef, useEffect,
} from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { CreateProjectDto } from '../../../types/projectType';
import useProjects from '../../../hooks/useProjects';
import useAuth from '../../../hooks/useAuth';
import './AddProject.css';
import iconAdd from '../../../images/icons/add.svg';
import AddSidebarElemForm from '../../../components/AddSidebarElemForm/AddSidebarElemForm';

const AddProject = () => {
  const [showForm, setShowForm] = useState(false);
  const { createProject } = useProjects();
  const { getHeaders } = useAuth();
  const ref = useRef<HTMLDivElement>(null);

  const handleShow = () => {
    setShowForm(true);
  };

  const initialValues: CreateProjectDto = {
    title: '',
  };

  const onSubmit = useCallback((
    body: CreateProjectDto,
    formikHelpers: FormikHelpers<CreateProjectDto>,
  ) => {
    const { resetForm } = formikHelpers;
    createProject({
      createProjectDto: body,
      headers: getHeaders(),
    });
    setShowForm(false);
    resetForm();
  }, [createProject, getHeaders]);

  const form = useFormik({
    initialValues,
    onSubmit,
  });

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (event.target && ref.current && !ref.current.contains((event.target as Node))) {
        setShowForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="add-project-button-wrapper">
      {showForm ? (
        <div style={{ width: '100%' }} ref={ref}>
          <AddSidebarElemForm form={form} />
        </div>
      ) : (
        <button
          type="button"
          className="add-project-button"
          onClick={handleShow}

        >
          <img src={iconAdd} alt="" />
          <span className="add__text">Add Project</span>
        </button>
      )}
    </div>

  );
};

export default AddProject;
