import './signupPage.scss';
import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserForm from '../../components/UserForm/UserForm';
import HeaderAuthorization from '../../components/HeaderAuthorization/HeaderAuthorization';
import Footer from '../../components/Footer/Footer';
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import getLoginSchema from '../../schemas/loginSchema';
import routes from '../../routes/routes';
import useAuth from '../../hooks/useAuth';

const SignupPage: React.FC = () => {
  const [errorServer, SetErrorServer] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const deleteError = () => {
    SetErrorServer(false);
  };

  const onSubmit = useCallback(async (body: {
    readonly email: string;
    readonly password: string;
  }) => {
    SetErrorServer(false);
    try {
      const { data } = await axios.post(routes.api.signup(), body);
      login(data);
      navigate(routes.pages.app());

      if (data.statusCode === 400) {
        throw new Error('User with this email already exists');
      }
    } catch (error) {
      SetErrorServer(true);
    }
  }, [navigate, login]);

  const form = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit,
    validationSchema: getLoginSchema(),
  });

  return (
    <div className="full-page">
      <HeaderAuthorization />
      <div className="signup">
        <div className="wrapper">
          <div className="signup__wrapper">
            <div className="signup__content content">
              <div className="content__title">Sign up</div>
              <UserForm
                form={form}
                errorServer={errorServer}
                deleteError={deleteError}
              />
              <div className="content__account">
                Already have an account? Then&nbsp;
                <ButtonLink to="/login" type="tertiary">
                  sign in
                </ButtonLink>
              </div>
            </div>
            <div className="signup__video">
              <video
                className="video"
                autoPlay
                muted
                poster="https://d3ptyyxy2at9ui.cloudfront.net/assets/images/c3fd023a570fc04ad3a60190af32ddd8.png"
              >
                <source
                  src="https://d3ptyyxy2at9ui.cloudfront.net/assets/video/d1cc9a7bd4e95120022d9a2d66d14fbe.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
