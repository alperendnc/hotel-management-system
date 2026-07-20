import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";

const ThemeContext = createContext(null);

function getInitialMode() {
  const savedMode = localStorage.getItem("hotelThemeMode");

  if (savedMode === "dark" || savedMode === "light") {
    return savedMode;
  }

  return "light";
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode);

  const toggleTheme = () => {
    setMode((currentMode) => {
      const newMode =
        currentMode === "light" ? "dark" : "light";

      localStorage.setItem("hotelThemeMode", newMode);

      return newMode;
    });
  };

  const setThemeMode = (newMode) => {
    if (newMode !== "light" && newMode !== "dark") {
      return;
    }

    localStorage.setItem("hotelThemeMode", newMode);
    setMode(newMode);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,

          primary: {
            main: mode === "light" ? "#2563eb" : "#60a5fa",
          },

          secondary: {
            main: "#7c3aed",
          },

          background: {
            default:
              mode === "light" ? "#f5f7fb" : "#0f172a",

            paper:
              mode === "light" ? "#ffffff" : "#111827",
          },

          text: {
            primary:
              mode === "light" ? "#111827" : "#f8fafc",

            secondary:
              mode === "light" ? "#6b7280" : "#94a3b8",
          },
        },

        typography: {
          fontFamily:
            '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },

        shape: {
          borderRadius: 12,
        },

        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                fontWeight: 700,
              },
            },
          },

          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },

          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
        },
      }),
    [mode],
  );

  const value = {
    mode,
    isDarkMode: mode === "dark",
    toggleTheme,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useThemeMode, ThemeProvider içerisinde kullanılmalıdır.",
    );
  }

  return context;
}