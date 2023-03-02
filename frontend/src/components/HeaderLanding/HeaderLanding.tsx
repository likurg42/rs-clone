import ButtonLink from '../ButtonLink/ButtonLink';
import Logo from '../Logo/Logo';
import './headerLanding.scss';
import useAuth from '../../hooks/useAuth';
import routes from '../../routes/routes';

const HeaderLanding: React.FC = () => {
  const { user: { token } } = useAuth();
  return (
    <header className="header">
      <div className="wrapper">
        <div className="header__container">
          <Logo />
          <div className="header__buttons">
            {token && (
              <ButtonLink to={routes.pages.app()} type="primary">
                Go to App
              </ButtonLink>
            )}
            <ButtonLink to={routes.pages.login()} type="primary">
              Sign in
            </ButtonLink>
            <ButtonLink to={routes.pages.signup()} type="secondary">
              Start for free
            </ButtonLink>
          </div>
        </div>
      </div>

    </header>
  );
};

export default HeaderLanding;
