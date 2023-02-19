import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import index from './routes/routes';
import SignupPage from './pages/SignupPage/SignupPage';
import Landing from './pages/Landing/Landing';
import AppPage from './pages/AppPage/AppPage';
import PrivateRoute from './routes/PrivateRoute';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={index.pages.main()} element={<Landing />} />
      <Route path={index.pages.login()} element={<LoginPage />} />
      <Route path={index.pages.signup()} element={<SignupPage />} />
      <Route
        path={index.pages.app()}
        element={(
          <PrivateRoute>
            <AppPage />
          </PrivateRoute>
        )}
      />
      <Route path="*" element={<h1>NO</h1>} />
    </Routes>
  </BrowserRouter>
);

export default App;
