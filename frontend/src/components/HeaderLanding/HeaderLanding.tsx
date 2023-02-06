import ButtonLink from '../ButtonLink/ButtonLink';
import Logo from '../Logo/Logo';
import './headerLanding.scss';

const HeaderLanding: React.FC = () => (
  <header className="header">
    <div className="wrapper">
      <div className="header__container">
        <Logo />
        <div className="header__buttons">
          <ButtonLink to="/login" type="primary">
            Sign in
          </ButtonLink>
          <ButtonLink to="/signup" type="secondary">
            Start for free
          </ButtonLink>
        </div>
      </div>
    </div>

  </header>
);

export default HeaderLanding;
