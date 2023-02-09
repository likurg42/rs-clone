import './userForm.scss';
import {
  FormikProps,
} from 'formik';

type FormProps = {
  readonly form: FormikProps<FormValues>
  readonly errorServer: boolean
  readonly deleteError: () => void
};
interface FormValues {
  readonly email: string;
  readonly password: string;
}

const UserForm: React.FC<FormProps> = (
  { form, errorServer, deleteError }: FormProps,
) => {
  function showPassword() {
    const input = document.querySelector('.form__password') as HTMLInputElement;
    const view = document.querySelector('.form__password-control') as HTMLElement;
    if (input.getAttribute('type') === 'password') {
      view.classList.add('form__password-view');
      input.setAttribute('type', 'text');
    } else {
      view.classList.remove('form__password-view');
      input.setAttribute('type', 'password');
    }
    return false;
  }
  console.log(form.touched.password);

  return (
    <form className="form" onSubmit={form.handleSubmit}>
      <div className="form__input-container">
        <label className="form__label" htmlFor="email">
          Email
        </label>
        <input
          className="form__email"
          name="email"
          type="email"
          placeholder="Enter your email..."
          value={form.values.email}
          onChange={form.handleChange}
          onFocus={deleteError}
          onBlur={(e) => { form.handleBlur(e); }}
        />
        {form.errors.email && form.touched.email && (
          <p className="form__error">{form.errors.email}</p>
        )}
      </div>
      <div className="form__input-container">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input
          className="form__password"
          name="password"
          type="password"
          placeholder="Enter your password..."
          value={form.values.password}
          onChange={form.handleChange}
          onFocus={deleteError}
          onBlur={(e) => { form.handleBlur(e); }}
        />
        <button className="form__password-control" aria-labelledby="showbutton" type="button" onClick={showPassword} />
        {form.errors.password && form.touched.password && (
          <p className="form__error">{form.errors.password}</p>
        )}
      </div>
      <button
        className="form__button"
        type="submit"
        disabled={!form.isValid || !form.dirty}
      >
        Sign in
      </button>
      {errorServer && (<p className="form__server-error">Incorrect email or password</p>)}
    </form>
  );
};

export default UserForm;
