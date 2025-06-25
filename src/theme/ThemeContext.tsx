import React, { createContext, useState, useContext } from 'react';
import { ColorValue } from 'react-native';

// Theme interface
export interface Theme {
  backgroundColor: ColorValue;
  textColor: ColorValue;
  primaryColor: ColorValue;
  secondaryColor: ColorValue;
  borderColor: ColorValue;
  iconColorInactive: ColorValue;
  iconColorActive: ColorValue;
  isDarkMode?: boolean;
}

// Light theme
const lightTheme: Theme = {
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  primaryColor: '#007bff',
  secondaryColor: '#6c757d',
  borderColor: '#e0e0e0',
  iconColorInactive: '#888888',
  iconColorActive: '#000000',
  isDarkMode: false,
};

// Dark theme
const darkTheme: Theme = {
  backgroundColor: '#121212',
  textColor: '#FFFFFF',
  primaryColor: '#3f51b5',
  secondaryColor: '#bb86fc',
  borderColor: '#333333',
  iconColorInactive: '#aaaaaa',
  iconColorActive: '#FFFFFF',
  isDarkMode: true,
};

// Create the theme context
const ThemeContext = createContext({
  theme: lightTheme,
  // eslint-disable-next-line
  setTheme: (theme: Theme) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
  isDarkMode: false,
});

// Theme Provider Component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? lightTheme : darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using theme
export function useTheme() {
  return useContext(ThemeContext);
}
