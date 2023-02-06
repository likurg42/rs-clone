import Logo from '../Logo/Logo';
import './headerAuthorization.scss';

const HeaderAuthorization: React.FC = () => (
  <header className="header">
    <div className="wrapper">
      <div className="header__container">
        <Logo />
      </div>
    </div>
  </header>
);

export default HeaderAuthorization;
