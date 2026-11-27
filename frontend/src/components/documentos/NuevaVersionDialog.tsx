import { useState } from "react";

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function NuevaVersionDialog({
  open,
  onClose,
}: Props) {
  const [comentario, setComentario] =
    useState("");

  const [archivo, setArchivo] =
    useState<File | null>(null);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Nueva versión documental
      </DialogTitle>

      <DialogContent>

        <Stack spacing={3} sx={{ mt: 1 }}>

          <Alert severity="warning">

            Crear una nueva versión debe utilizarse
            únicamente cuando exista una modificación
            real del documento.

            No es necesario cargar una nueva versión
            para responder comentarios.

          </Alert>

          <TextField
            label="Comentario de la versión"
            multiline
            minRows={4}
            value={comentario}
            onChange={(e) =>
              setComentario(
                e.target.value,
              )
            }
          />

          <Button
            component="label"
            variant="outlined"
          >

            Seleccionar archivo

            <input
              hidden
              type="file"
              onChange={(e) =>
                setArchivo(
                  e.target.files?.[0] ??
                    null,
                )
              }
            />

          </Button>

          {archivo && (

            <Typography
              color="text.secondary"
            >
              {archivo.name}
            </Typography>

          )}

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancelar
        </Button>

        <Button
          variant="contained"
        >
          Guardar versión
        </Button>

      </DialogActions>

    </Dialog>
  );
}