import { useContext } from 'react';
import ThemeContext, { ThemeContextType } from '../context/themeContext';

const useTheme = () => useContext(ThemeContext) as ThemeContextType;

export default useTheme;
