import ButtonLink from '../../components/ButtonLink/ButtonLink';
import Footer from '../../components/Footer/Footer';
import HeaderAuthorization from '../../components/HeaderAuthorization/HeaderAuthorization';
import LoginForm from '../../components/LoginForm/LoginForm';
import './signupPage.scss';

const SignupPage: React.FC = () => (
  <>
    <HeaderAuthorization />
    <div className="signup">
      <div className="signup__wrapper">
        <div className="signup__content content">
          <div className="content__title">Sign up</div>
          <LoginForm />
          <div className="content__account">
            Already have an account? Then&nbsp;
            <ButtonLink to="/login" type="tertiary">
              sign in
            </ButtonLink>
          </div>
        </div>
        <div className="signup__video">
          <video
            className="video"
            autoPlay
            muted
            poster="https://d3ptyyxy2at9ui.cloudfront.net/assets/images/c3fd023a570fc04ad3a60190af32ddd8.png"
          >
            <source
              src="https://d3ptyyxy2at9ui.cloudfront.net/assets/video/d1cc9a7bd4e95120022d9a2d66d14fbe.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default SignupPage;
