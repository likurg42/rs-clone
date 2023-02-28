import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';
import useAuth from '../hooks/useAuth';
import routes from './routes';

type PropsWithChildren = { readonly children: ReactElement; };

const PrivateRoute = ({ children }: PropsWithChildren): ReactElement | null => {
  const { user } = useAuth();
  const { token } = user;
  return (
    token ? children : <Navigate to={routes.pages.login()} />
  );
};

export default PrivateRoute;
