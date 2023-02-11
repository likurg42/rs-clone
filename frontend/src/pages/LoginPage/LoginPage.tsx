import './loginPage.scss';
import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderAuthorization from '../../components/HeaderAuthorization/HeaderAuthorization';
import login from './login.png';
import Footer from '../../components/Footer/Footer';
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import UserForm from '../../components/UserForm/UserForm';
import getValidationSchema from '../../schemas/validationSchema';

const LoginPage: React.FC = () => {
  const [errorServer, setErrorServer] = useState(false);
  const navigate = useNavigate();

  const deleteError = () => {
    setErrorServer(false);
  };

  const onSubmit = useCallback(async (values: {
    readonly email: string;
    readonly password: string;
  }) => {
    try {
      console.log('submit', values);
      const body = {
        email: values.email,
        password: values.password,
      };
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data);
      if (data.token) {
        navigate('/');
        localStorage.setItem('token', data.token + data.email);
      }
      if (data.message) {
        throw new Error('Incorrect email or password');
      }
    } catch (error) {
      setErrorServer(true);
    }
  }, [navigate]);

  const form = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit,
    validationSchema: getValidationSchema(),
  });

  return (
    <div className="full-page">
      <HeaderAuthorization />
      <div className="login">
        <div className="wrapper">
          <div className="login__wrapper">
            <div className="login__content content">
              <div className="content__title">Log in</div>
              <UserForm
                form={form}
                errorServer={errorServer}
                deleteError={deleteError}
              />
              <div className="content__account">
                Don&apos;t have an account yet?&nbsp;
                <ButtonLink to="/signup" type="tertiary">
                  Register
                </ButtonLink>
              </div>
            </div>
            <div className="login__img img">
              <img
                className="img__devices"
                src={login}
                alt="drawn devices"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
