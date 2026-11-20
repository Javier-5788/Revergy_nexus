import { Paper, Typography } from "@mui/material";

export default function TmtPage() {
  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
      <Typography variant="h4" gutterBottom>
        TMT
      </Typography>
      <Typography color="text.secondary">
        Aquí se consultarán y generarán las entregas documentales del proyecto.
      </Typography>
    </Paper>
  );
}