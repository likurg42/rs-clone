import React, {
  useState, useMemo, useCallback, ReactNode,
} from 'react';

export type ThemeContextType = {
  themes: Themes
  theme: string | null
  changeTheme: (theme: string | null) => void
};

type Themes = {
  DARK: string
};

export const themes: Themes = {
  DARK: 'dark',
};

const ThemeContext = React.createContext<ThemeContextType | null>(null);

type PropsWithChildren = { readonly children: ReactNode };

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<string | null>(null);

  const changeTheme = useCallback((arg: string | null) => {
    setTheme(arg);
  }, []);

  const providerValue = useMemo(
    () => ({
      changeTheme, theme, themes,
    }),
    [changeTheme, theme],
  );

  return <ThemeContext.Provider value={providerValue}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
