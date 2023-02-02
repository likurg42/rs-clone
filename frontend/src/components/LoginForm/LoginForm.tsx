import "./loginForm.scss";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

const LoginForm: React.FC = () => {
  function showPassword() {
    let input = document.querySelector(".form__password") as HTMLInputElement;
    let view = document.querySelector(".form__password-control") as HTMLElement;
    if (input.getAttribute("type") === "password") {
      view.classList.add("form__password-view");
      input.setAttribute("type", "text");
    } else {
      view.classList.remove("form__password-view");
      input.setAttribute("type", "password");
    }
    return false;
  }

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validateOnBlur
      onSubmit={(values) => {
        console.log("submit", values);
      }}
      validationSchema={validationSchema}
    >
      {({ values, errors, touched, isValid, dirty }) => (
        <Form className="form">
          <div className="form__input-container">
            <label className="form__label" htmlFor="email">
              Email
            </label>
            <Field
              className="form__email"
              name="email"
              type="email"
              placeholder="Enter your email..."
              value={values.email}
            />
            {errors.email && touched.email && (
              <p className="form__error">{errors.email}</p>
            )}
          </div>

          <div className="form__input-container">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <Field
              className="form__password"
              name="password"
              type="password"
              placeholder="Enter your password..."
              value={values.password}
            />
            <a className="form__password-control" onClick={showPassword}></a>
            {errors.password && touched.password && (
              <p className="form__error">{errors.password}</p>
            )}
          </div>
          <button
            className="form__button"
            type="submit"
            disabled={!isValid || !dirty}
          >
            Sign in
          </button>
        </Form>
      )}
    </Formik>
  );
};

export { LoginForm };