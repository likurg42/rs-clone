import { Link } from 'react-router-dom';
import './header.scss';
import logo from './logo.svg';

const Header: React.FC = () => (
  <header className="header">
    <div className="header__conteiner">
      <img
        className="header__logo"
        src={logo}
        alt="logo"
      />
      <div className="header__buttons">
        <Link to="/login">
          <button className="header__button" type="button">Sign in</button>
        </Link>
        <Link to="/signup">
          <button className="header__button" type="button">Sign up</button>
        </Link>
      </div>
    </div>
  </header>
);

export default Header;
