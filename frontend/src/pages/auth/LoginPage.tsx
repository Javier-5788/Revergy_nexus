import { useState, type FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

type ErrorResponse = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const destino =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname ?? "/";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCargando(true);

    try {
      const respuesta = await authService.login({
        correo_usuario: correo,
        password,
      });

      signIn(respuesta.access_token, respuesta.usuario,);
      navigate(destino, { replace: true });
    } catch (err) {
      const mensaje = (err as ErrorResponse).response?.data?.message;
      setError(
        typeof mensaje === "string"
          ? mensaje
          : "No se pudo iniciar sesión. Revisa el correo y la contraseña.",
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          p: 8,
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 800 }} gutterBottom>
          REVERGY NEXUS
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          Gestión documental y trazabilidad para proyectos de ingeniería.
        </Typography>
      </Box>

      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          alignItems: "center",
          py: 5,
        }}
      >
        <Paper variant="outlined" sx={{ width: "100%", p: { xs: 3, sm: 4 } }}>
          <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
                Bienvenido
              </Typography>
              <Typography color="text.secondary">
                Inicia sesión para acceder a tus proyectos.
              </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Correo electrónico"
              type="email"
              autoComplete="username"
              value={correo}
              onChange={(event) => setCorreo(event.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              fullWidth
            />

            <Button type="submit" variant="contained" disabled={cargando} fullWidth>
              {cargando ? "Ingresando…" : "Iniciar sesión"}
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}