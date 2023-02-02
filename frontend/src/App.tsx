import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import LoginPage from './pages/LoginPage/LoginPage';
import routes from './routes/routes';
import SignupPage from './pages/SignupPage/SignupPage';

const App = () => {
  console.log('hi');
  return (
    <>
      <Header />
      <Routes>
        <Route path={routes.pages.login()} element={<LoginPage />} />
        <Route path={routes.pages.signup()} element={<SignupPage />} />
        <Route path="*" element={<h1>NO</h1>} />
      </Routes>
    </>
  );
};

export default App;
