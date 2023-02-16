import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { AuthProvider } from './context/authContext';
import store from './slice/store/store';

const init = () => {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

  root.render(
    <React.StrictMode>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </React.StrictMode>,
  );
};

export default init;
