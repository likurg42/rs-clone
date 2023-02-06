import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import LoginPage from './pages/LoginPage/LoginPage';
import routes from './routes/routes';
import SignupPage from './pages/SignupPage/SignupPage';
import Landing from './pages/Landing/Landing';

const App = () => {
  console.log('hi');
  useEffect(() => {
    const getData = async () => {
      const users = await axios.get('/api/users');
      console.log(users);
    };

    getData();
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.pages.main()} element={<Landing />} />
        <Route path={routes.pages.login()} element={<LoginPage />} />
        <Route path={routes.pages.signup()} element={<SignupPage />} />
        <Route path="*" element={<h1>NO</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
