import './footer.scss';

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__gitHub gitHub">
        <a
          className="gitHub__lik"
          href="https://github.com/likurg42"
          target="_blank"
          rel="noreferrer"
        >
          Likurg42
        </a>
        <a
          className="gitHub__jul"
          href="https://github.com/JuliaGrib"
          target="_blank"
          rel="noreferrer"
        >
          JuliaGrib
        </a>
        <a
          className="gitHub__kar"
          href="https://github.com/Karinaguseva"
          target="_blank"
          rel="noreferrer"
        >
          KarinaGuseva
        </a>
      </div>
      <div className="footer__year">&copy; 2023</div>
      <a
        className="footer__rss"
        href="https://rs.school/js/"
        target="_blank"
        rel="noreferrer"
      >
        rs school course js
      </a>
    </div>
  </footer>
);

export default Footer;
