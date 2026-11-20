import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import theme from "./theme/theme";
import "./index.css";
import {ProyectoProvider} from "./context/ProyectoContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ProyectoProvider>
          <App />
        </ProyectoProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);