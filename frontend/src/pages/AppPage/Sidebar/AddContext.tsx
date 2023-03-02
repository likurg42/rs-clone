import {
  useCallback, useState, useRef, useEffect,
} from 'react';
import { FormikHelpers, useFormik } from 'formik';
import useAuth from '../../../hooks/useAuth';
import './AddProject.css';
import iconAdd from '../../../images/icons/add.svg';
import AddSidebarElemForm from '../../../components/AddSidebarElemForm/AddSidebarElemForm';
import { CreateContextDto } from '../../../types/contextType';
import useContexts from '../../../hooks/useContexts';

const AddContext = () => {
  const [showForm, setShowForm] = useState(false);
  const { createContext } = useContexts();
  const { getHeaders } = useAuth();
  const ref = useRef<HTMLDivElement>(null);

  const handleShow = () => {
    setShowForm(true);
  };

  const initialValues: CreateContextDto = {
    title: '',
  };

  const onSubmit = useCallback((
    body: CreateContextDto,
    formikHelpers: FormikHelpers<CreateContextDto>,
  ) => {
    const { resetForm } = formikHelpers;
    createContext({
      createContextDto: body,
      headers: getHeaders(),
    });
    setShowForm(false);
    resetForm();
  }, [createContext, getHeaders]);

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
        <div ref={ref}>
          <AddSidebarElemForm form={form} />
        </div>
      ) : (
        <button
          type="button"
          className="add-project-button"
          onClick={handleShow}
        >
          <img src={iconAdd} alt="" />
          <span className="add__text">Add Context</span>
        </button>
      )}
    </div>
  );
};

export default AddContext;
