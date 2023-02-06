import ButtonLink from '../../components/ButtonLink/ButtonLink';
import HeaderLanding from '../../components/HeaderLanding/HeaderLanding';
import './landing.scss';
import leftImg from './bg-left.png';
import illustration from './bg-illustration.png';
import rightImg from './bg-right.png';
import Footer from '../../components/Footer/Footer';

const Landing: React.FC = () => (
  <>
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
    </main>
    <Footer />
  </>
);

export default Landing;
