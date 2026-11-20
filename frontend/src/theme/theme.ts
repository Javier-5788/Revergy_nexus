import { createTheme } from "@mui/material/styles";
import colors from "./colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.primary,
      dark: colors.primaryDark,
      light: colors.primaryLight,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: colors.secondary,
      contrastText: "#FFFFFF",
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    text: {
      primary: colors.text,
      secondary: colors.textSecondary,
    },
    divider: colors.border,
    error: {
      main: colors.error,
    },
    success: {
      main: colors.success,
    },
  },
  typography: {
    fontFamily: 'Heebo, "Segoe UI", Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 40,
          borderRadius: 8,
          paddingInline: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(60, 60, 59, 0.06)",
        },
      },
    },
  },
});

export default theme;