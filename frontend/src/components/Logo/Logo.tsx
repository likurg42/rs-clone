import { Link } from 'react-router-dom';
import logo from './logo.svg';

const Logo = () => (
  <Link to="/">
    <img
      className="header__logo"
      src={logo}
      alt="logo"
    />
  </Link>
);

export default Logo;
