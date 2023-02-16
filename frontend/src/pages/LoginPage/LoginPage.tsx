import './loginPage.scss';
import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderAuthorization from '../../components/HeaderAuthorization/HeaderAuthorization';
import loginImg from './login.png';
import Footer from '../../components/Footer/Footer';
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import UserForm from '../../components/UserForm/UserForm';
import getValidationSchema from '../../schemas/validationSchema';
import useAuth from '../../hooks/useAuth';
import routes from '../../routes/routes';

const LoginPage: React.FC = () => {
  const [errorServer, setErrorServer] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const deleteError = () => {
    setErrorServer(false);
  };

  const onSubmit = useCallback(async (body: {
    readonly email: string;
    readonly password: string;
  }) => {
    setErrorServer(false);
    try {
      const { data } = await axios.post(routes.api.login(), body);
      login(data);

      if (data.token) {
        navigate(routes.pages.app());
      }

      if (data.message) {
        throw new Error('Incorrect email or password');
      }
    } catch (error) {
      console.log(error);
      setErrorServer(true);
    }
  }, [login, navigate]);

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
                src={loginImg}
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
