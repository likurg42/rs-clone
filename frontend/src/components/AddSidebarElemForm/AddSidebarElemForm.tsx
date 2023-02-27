import { FormikProps } from 'formik';
import { ArrowUpCircleFill } from 'react-bootstrap-icons';
import { CreateContextDto } from '../../types/contextType';
import { CreateProjectDto } from '../../types/projectType';
import './AddSidebarElemForm.css';

type AddSidebarFormProps = {
  readonly form: FormikProps<CreateProjectDto | CreateContextDto>;
};

const AddSidebarElemForm = ({ form }: AddSidebarFormProps) => {
  const { values, handleChange, handleSubmit } = form;

  return (
    <form
      className="add-sidebar-elem-form"
      onSubmit={handleSubmit}
    >
      <input type="text" value={values.title} name="title" onChange={handleChange} autoFocus />
      <button type="submit">
        <ArrowUpCircleFill />
      </button>
    </form>
  );
};

export default AddSidebarElemForm;
