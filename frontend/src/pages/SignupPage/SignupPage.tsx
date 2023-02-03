import HeaderAuthorization from '../../components/HeaderAuthorization/HeaderAuthorization';
import LoginForm from '../../components/LoginForm/LoginForm';
import './signupPage.scss';

const SignupPage: React.FC = () => (
  <>
    <HeaderAuthorization />
    <div className="signup">
      <div className="signup__content content">
        <div className="content__title">Sign up</div>
        <LoginForm />
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
  </>
);

export default SignupPage;
