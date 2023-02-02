import "./loginPage.scss";
import login from "./login.png";
import { LoginForm } from "../../components/LoginForm/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="login">
      <div className="login__content content">
        <div className="content__title">Log in</div>
        <LoginForm />
      </div>
      <div className="login__img img">
        <img
          className="img__devices"
          src={login}
          alt="picture with drawn devices"
        ></img>
      </div>
    </div>
  );
};

export { LoginPage };
