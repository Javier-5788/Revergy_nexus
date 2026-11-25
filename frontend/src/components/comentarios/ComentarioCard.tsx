import {
  Box,
  Button,
  Chip,
  Paper,
  Typography,
} from "@mui/material";

import type {
  ComentarioDocumento,
} from "../../types/comentario.types";

type Props = {
  comentario: ComentarioDocumento;
  onVerHistorial: (
    comentarioId: number,
  ) => void;

  onAtender: (
    comentarioId: number,
  ) => void;

  onCerrar: (
    comentarioId: number,
  ) => void;
};

export default function ComentarioCard({
  comentario,
  onVerHistorial,
  onAtender,
  onCerrar,
}: Props) {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
      }}
    >
      <Typography>
        {comentario.mensaje}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          mt: 2,
          flexWrap: "wrap",
        }}
      >
        <Chip
          label={
            comentario.estado_comentario
              ?.nombre_estado ??
            "Sin estado"
          }
        />

        <Chip
          variant="outlined"
          label={
            comentario.usuario
              ?.nombre_usuario ??
            "Sin usuario"
          }
        />
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1 }}
      >
        {new Intl.DateTimeFormat(
          "es-CO",
          {
            dateStyle: "medium",
          },
        ).format(
          new Date(
            comentario.fecha,
          ),
        )}
      </Typography>

      <Button
        sx={{ mt: 2 }}
        size="small"
        onClick={() =>
          onVerHistorial(
            comentario.id_com_doc,
          )
        }
      >
        Ver historial
      </Button>
      <Box
  sx={{
    display: "flex",
    gap: 1,
    mt: 2,
  }}
>

  {comentario.estado_comentario
    ?.codigo_estado ===
    "ABI" && (

    <Button
      variant="contained"
      size="small"
      onClick={() =>
        onAtender(
          comentario.id_com_doc,
        )
      }
    >
      Atender
    </Button>

  )}

  {comentario.estado_comentario
    ?.codigo_estado ===
    "ATE" && (

    <Button
      color="success"
      variant="contained"
      size="small"
      onClick={() =>
        onCerrar(
          comentario.id_com_doc,
        )
      }
    >
      Cerrar
    </Button>

  )}

</Box>
    </Paper>
  );
}