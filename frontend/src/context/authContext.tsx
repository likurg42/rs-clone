import React, {
  useState, useMemo, useCallback, ReactNode,
} from 'react';

type User = {
  readonly id: number,
  readonly token: string,
  readonly email: string,
};

type EmptyUser = {
  readonly token: null,
  readonly id: null,
  readonly email: null,
};

export type AuthContextType = {
  readonly user: User;
  readonly getHeaders: () => {
    readonly Authorization?: string;
  }
  readonly login: (data: User) => void;
  readonly logout: () => void;
};

const generateEmptyUser = (): EmptyUser => ({
  id: null,
  token: null,
  email: null,
});
const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : generateEmptyUser();
};

const setUserInLocalStorage = (user: User | EmptyUser) => localStorage.setItem('user', JSON.stringify(user));

const AuthContext = React.createContext<AuthContextType | null>(null);

type PropsWithChildren = { readonly children: ReactNode };
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());

  const getHeaders = useCallback(() => {
    const { token } = user;
    if (token) return { Authorization: `Bearer ${token}` };
    return {};
  }, [user]);

  const login = (data: User) => {
    setUser(data);
    setUserInLocalStorage(data);
  };

  const logout = () => {
    const emptyUser = generateEmptyUser();
    setUser(emptyUser);
    setUserInLocalStorage(emptyUser);
  };

  const providerValue = useMemo(
    () => ({
      user, getHeaders, logout, login,
    }),
    [user, getHeaders],
  );

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
