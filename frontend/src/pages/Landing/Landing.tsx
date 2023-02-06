import ButtonLink from '../../components/ButtonLink/ButtonLink';
import HeaderLanding from '../../components/HeaderLanding/HeaderLanding';
import './landing.scss';
import leftImg from './bg-left.png';
import illustration from './bg-illustration.png';
import rightImg from './bg-right.png';
import Footer from '../../components/Footer/Footer';
import divider from './divider.png';
import adobe from './adobe.svg';
import amazon from './amazon.svg';
import apple from './apple.svg';
import disney from './disney.svg';
import rss from './rss.svg';

const Landing: React.FC = () => (
  <div className="full-page">
    <HeaderLanding />
    <main className="main">
      <section className="intro">
        <div className="intro__container">
          <h1 className="intro__title">
            Organize your work and life.
          </h1>
          <h2 className="intro__subtitle">
            Todoist – to-do list and task manager number 1 in the world.
            It will help you gain concentration, organization and peace.
          </h2>
          <ButtonLink to="/signup" type="secondary">
            Start for free
          </ButtonLink>
        </div>
        <div className="intro__images images">
          <img
            className="images__left"
            src={leftImg}
            alt="people with devices"
          />
          <img
            className="images__illustration"
            src={illustration}
            alt="illustration of app"
          />
          <img
            className="images__right"
            src={rightImg}
            alt="people with devices"
          />
        </div>
      </section>
      <section className="review">
        <img
          className="review__divider"
          src={divider}
          alt="divider"
        />
        <div className="review__content content">
          <div className="content__wrapper">
            <div className="content__rates">
              <p className="content__text">
                300,000+ RATES
              </p>
              <p className="content__text">★★★★★</p>
              <p className="content__text">App Store и Google Play</p>
            </div>
            <div className="content__brands">
              <p className="content__text">USE TEAM AND EMPLOYEES IN</p>
              <div className="content__list">
                <img
                  className="content__brand"
                  src={adobe}
                  alt="adobe"
                />
                <img
                  className="content__brand"
                  src={amazon}
                  alt="amazon"
                />
                <img
                  className="content__brand"
                  src={disney}
                  alt="disney"
                />
                <img
                  className="content__brand"
                  src={rss}
                  alt="apple"
                />
                <img
                  className="content__brand"
                  src={apple}
                  alt="apple"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Landing;
