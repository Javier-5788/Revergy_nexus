import { Paper, Typography } from "@mui/material";

export default function ComentariosPage() {
  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
      <Typography variant="h4" gutterBottom>
        Comentarios
      </Typography>
      <Typography color="text.secondary">
        Aquí se gestionarán las observaciones y su historial de estados.
      </Typography>
    </Paper>
  );
}