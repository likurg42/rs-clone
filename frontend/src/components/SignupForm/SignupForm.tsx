import './signupForm.scss';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import React, { useCallback, useState } from 'react';

const SignupForm: React.FC = () => {
  const [errorServer, SetErrorServer] = useState(false);

  const deleteError = () => {
    SetErrorServer(false);
  };

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

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  const onSubmit = useCallback(async (values: {
    readonly email: string;
    readonly password: string;
  }) => {
    try {
      SetErrorServer(false);
      console.log('submit', values);
      const body = {
        email: values.email,
        password: values.password,
      };
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data);
      if (data.statusCode === 400) {
        throw new Error('User with this email already exists');
      }
    } catch (error) {
      SetErrorServer(true);
    }
  }, []);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validateOnBlur
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        values, errors, touched, isValid, dirty,
      }) => (
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
              onFocus={deleteError}
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
              onFocus={deleteError}
            />
            <button className="form__password-control" aria-labelledby="showbutton" type="button" onClick={showPassword} />
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
          {errorServer && (<p className="form__server-error">User with this email already exists</p>)}
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
