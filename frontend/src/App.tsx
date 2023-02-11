import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import routes from './routes/routes';
import SignupPage from './pages/SignupPage/SignupPage';
import Landing from './pages/Landing/Landing';
import TasksPage from './pages/TasksPage/TasksPage';

const App = () => {
  console.log('hi');
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.pages.main()} element={<Landing />} />
        <Route path={routes.pages.login()} element={<LoginPage />} />
        <Route path={routes.pages.signup()} element={<SignupPage />} />
        <Route path={routes.pages.tasks()} element={<TasksPage />} />
        <Route path="*" element={<h1>NO</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
