import { useEffect, useState } from "react";
import {
  Alert,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useProyecto } from "../../context/ProyectoContext";
import { comentarioService } from "../../services/comentario.service";

export default function ComentariosPage() {
  const { proyectoActivo } =
    useProyecto();

  const [comentarios,
    setComentarios] =
    useState<any[]>([]);

  const [cargando,
    setCargando] =
    useState(true);

  const [error,
    setError] =
    useState("");

  useEffect(() => {

    if (
      !proyectoActivo
    ) {
      return;
    }

    async function cargar() {

      try {

        const datos =
          await comentarioService
            .obtenerPorProyecto(
              proyectoActivo.proyecto_id,
            );

        setComentarios(datos);

      } catch {

        setError(
          "No se pudieron cargar los comentarios.",
        );

      } finally {

        setCargando(false);

      }

    }

    void cargar();

  }, [proyectoActivo]);

  if (cargando) {
    return (
      <CircularProgress />
    );
  }

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >

      <Typography
        variant="h4"
        gutterBottom
      >
        Comentarios
      </Typography>

      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              Estado
            </TableCell>

            <TableCell>
              Documento
            </TableCell>

            <TableCell>
              Comentario
            </TableCell>

            <TableCell>
              Usuario
            </TableCell>

            <TableCell>
              Fecha
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {comentarios.map(
            (comentario) => (

              <TableRow
                key={
                  comentario.id_com_doc
                }
              >

                <TableCell>
                  {
                    comentario
                      .estado_comentario
                      ?.nombre_estado
                  }
                </TableCell>

                <TableCell>
                  {
                    comentario
                      .documento
                      ?.codigo_documento
                  }
                </TableCell>

                <TableCell>
                  {
                    comentario.mensaje
                  }
                </TableCell>

                <TableCell>
                  {
                    comentario
                      .usuario
                      ?.nombre_usuario
                  }
                </TableCell>

                <TableCell>
                  {
                    new Intl.DateTimeFormat(
                      "es-CO",
                      {
                        dateStyle:
                          "medium",
                      },
                    ).format(
                      new Date(
                        comentario.fecha,
                      ),
                    )
                  }
                </TableCell>

              </TableRow>

            ),
          )}

        </TableBody>

      </Table>

    </Paper>
  );
}