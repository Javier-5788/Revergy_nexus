import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onGuardar: (mensaje: string) => Promise<void>;
};

export default function NuevoComentarioDialog({
  open,
  onClose,
  onGuardar,
}: Props) {

  const [mensaje,
    setMensaje] =
    useState("");

  async function guardar() {

    if (!mensaje.trim()) {
      return;
    }

    await onGuardar(mensaje);

    setMensaje("");

    onClose();

  }

  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >

      <DialogTitle>
        Nuevo comentario
      </DialogTitle>

      <DialogContent>

        <TextField
          multiline
          minRows={4}
          fullWidth
          sx={{ mt: 1 }}
          label="Comentario"
          value={mensaje}
          onChange={(e) =>
            setMensaje(
              e.target.value,
            )
          }
        />

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={guardar}
        >
          Guardar
        </Button>

      </DialogActions>

    </Dialog>

  );

}