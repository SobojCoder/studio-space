"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const subscribe = () => () => {};

function getMountedSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

export default function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const mounted = useSyncExternalStore(
    subscribe,
    getMountedSnapshot,
    getServerSnapshot
  );

  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem(
      "studiospace-theme"
    );

    if (savedTheme === "light" || savedTheme === "dark") {
      document.documentElement.classList.toggle(
        "dark",
        savedTheme === "dark"
      );
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);

    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    );

    localStorage.setItem("studiospace-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={mounted ? "theme-ready" : "theme-loading"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}