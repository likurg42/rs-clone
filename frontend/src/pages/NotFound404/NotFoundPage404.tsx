import { FC } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import HeaderLanding from '../../components/HeaderLanding/HeaderLanding';
import './notFoundPage404.scss';

const NotFoundPage404: FC = () => (
  <div className="full-page">
    <HeaderLanding />
    <div className="error">
      <h1 className="error__title">404</h1>
      <h2 className="error__subtitle">Page not found</h2>
      <Link to="/" className="error__link">
        <p className="error__text">
          Go Home
        </p>
      </Link>
    </div>

    <Footer />
  </div>
);

export default NotFoundPage404;
