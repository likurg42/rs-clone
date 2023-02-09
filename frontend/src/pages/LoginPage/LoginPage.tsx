import './loginPage.scss';
import HeaderAuthorization from '../../components/HeaderAuthorization/HeaderAuthorization';
import login from './login.png';
import Footer from '../../components/Footer/Footer';
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage: React.FC = () => (
  <div className="full-page">
    <HeaderAuthorization />
    <div className="login">
      <div className="wrapper">
        <div className="login__wrapper">
          <div className="login__content content">
            <div className="content__title">Log in</div>
            <LoginForm />
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

export default LoginPage;
