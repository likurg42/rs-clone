import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';

const init = () => {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
};

export default init;
