import {
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import type {
  HistorialComentario,
} from "../../types/historial-comentario.types";

type Props = {
  open: boolean;
  onClose: () => void;
  historial: HistorialComentario[];
};

export default function HistorialComentarioDialog({
  open,
  onClose,
  historial,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Historial del Comentario
      </DialogTitle>

      <DialogContent>

        <Stack spacing={2}>

          {historial.map(
            (item) => (
              <Paper
                key={
                  item.id_historial_comentario
                }
                sx={{
                  p: 2,
                }}
              >
                <Typography
                  sx={{ fontWeight: 700 }}
                >
                  {
                    item
                      .estado_comentario_historial_comentario_estado_anterior_idToestado_comentario
                      ?.nombre_estado
                  }

                  {" → "}

                  {
                    item
                      .estado_comentario_historial_comentario_estado_nuevo_idToestado_comentario
                      ?.nombre_estado
                  }
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Usuario:

                  {" "}

                  {
                    item.usuario
                      ?.nombre_usuario
                  }
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {
                    new Intl.DateTimeFormat(
                      "es-CO",
                      {
                        dateStyle:
                          "medium",
                      },
                    ).format(
                      new Date(
                        item.fecha_movimiento,
                      ),
                    )
                  }
                </Typography>

                {item.observacion && (
                  <Typography
                    sx={{ mt: 1 }}
                  >
                    {
                      item.observacion
                    }
                  </Typography>
                )}
              </Paper>
            ),
          )}

        </Stack>

      </DialogContent>

    </Dialog>
  );
}