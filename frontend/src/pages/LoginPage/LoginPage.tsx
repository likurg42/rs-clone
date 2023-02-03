import './loginPage.scss';
import HeaderAuthorization from '../../components/HeaderAuthorization/HeaderAuthorization';
import login from './login.png';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage: React.FC = () => (
  <>
    <HeaderAuthorization />
    <div className="login">
      <div className="login__content content">
        <div className="content__title">Log in</div>
        <LoginForm />
      </div>
      <div className="login__img img">
        <img
          className="img__devices"
          src={login}
          alt="drawn devices"
        />
      </div>
    </div>
  </>
);

export default LoginPage;
