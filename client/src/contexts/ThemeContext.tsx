// src/context/ThemeContext.tsx
import React, {createContext, useContext, useState} from "react";

// Define the theme types
type Theme = "light" | "dark";

// Create an interface for the context
interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

// Create the context
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Create a provider component
export const ThemeProvider = ({children}: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
