import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import NuevoComentarioDialog from "../../components/comentarios/NuevoComentarioDialog";
import { useProyecto } from "../../context/ProyectoContext";
import { useAuth } from "../../context/AuthContext";
import { documentoService } from "../../services/documento.service";
import { comentarioService } from "../../services/comentario.service";
import { historialComentarioService } from "../../services/historial-comentario.service";

import type { DocumentoDetalle } from "../../types/documento.types";
import type { ComentarioDocumento } from "../../types/comentario.types";
import type { HistorialComentario } from "../../types/historial-comentario.types";

import ComentarioCard from "../../components/comentarios/ComentarioCard";
import HistorialComentarioDialog from "../../components/comentarios/HistorialComentarioDialog";

function fechaLegible(fecha: string) {
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
  }).format(new Date(fecha));
}

export default function DocumentoDetallePage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { proyectoActivo } = useProyecto();

  const [documento, setDocumento] =
    useState<DocumentoDetalle | null>(null);

  const [comentarios, setComentarios] =
    useState<ComentarioDocumento[]>([]);

  const [historial, setHistorial] =
    useState<HistorialComentario[]>([]);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [cargando, setCargando] =
    useState(true);

  const [error, setError] =
    useState("");

  const { user } = useAuth();

  const [nuevoComentarioOpen, setNuevoComentarioOpen] = useState(false);

  async function verHistorial(
    comentarioId: number,
  ) {
    try {
      const datos =
        await historialComentarioService.obtenerPorComentario(
          comentarioId,
        );

      setHistorial(datos);

      setDialogOpen(true);
    } catch {
      setError(
        "No se pudo cargar el historial del comentario.",
      );
    }
  }

  async function cargarComentarios() {

    const documentoId =
      Number(id);

    const datos =
      await comentarioService
        .obtenerPorDocumento(
          documentoId,
        );

    setComentarios(datos);

  }

  async function crearComentario(
    mensaje: string,
  ) {

    const documentoId =
      Number(id);

    await comentarioService
      .crearComentario({
        documento_id:
          documentoId,
        usuario_id:
          user?.id_usuario ?? 1,
        mensaje,
      });
    await cargarComentarios();

    setNuevoComentarioOpen(false);

  }

  async function atenderComentario(
    comentarioId: number,
  ) {

    await comentarioService
      .atenderComentario(

        comentarioId,

        user?.id_usuario ?? 1,

      );

    await cargarComentarios();

  }

  async function cerrarComentario(
    comentarioId: number,
  ) {

    await comentarioService
      .cerrarComentario(

        comentarioId,

        user?.id_usuario ?? 1,

      );

    await cargarComentarios();

  }
  useEffect(() => {
    const documentoId = Number(id);

    const proyectoId =
      proyectoActivo?.proyecto_id;

    if (
      !Number.isInteger(documentoId) ||
      proyectoId == null ||
      !Number.isInteger(proyectoId)
    ) {
      setError(
        "No se encontró el documento o el proyecto activo.",
      );

      setCargando(false);

      return;
    }

    const idProyecto = proyectoId;

    let vigente = true;

    async function cargarDocumento() {
      setCargando(true);
      setError("");

      try {
        const resultado =
          await documentoService.obtenerPorId(
            documentoId,
            idProyecto,
          );

        const comentariosDocumento =
          await comentarioService.obtenerPorDocumento(
            documentoId,
          );

        if (vigente) {
          setDocumento(resultado);

          setComentarios(
            comentariosDocumento,
          );
        }
      } catch {
        if (vigente) {
          setError(
            "No se pudo cargar el detalle del documento.",
          );
        }
      } finally {
        if (vigente) {
          setCargando(false);
        }
      }
    }

    void cargarDocumento();

    return () => {
      vigente = false;
    };
  }, [
    id,
    proyectoActivo?.proyecto_id,
  ]);

  if (cargando) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 6,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() =>
          navigate("/documentos")
        }
        sx={{
          alignSelf: "flex-start",
        }}
      >
        Volver a documentos
      </Button>

      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      {documento && (
        <>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
              }}
              gutterBottom
            >
              {documento.nombre_documento}
            </Typography>

            <Typography
              color="text.secondary"
            >
              {
                documento.codigo_documento
              }
            </Typography>
          </Box>

          <Paper
            sx={{
              p: {
                xs: 2,
                md: 3,
              },
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
              }}
              gutterBottom
            >
              Información del documento
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2,minmax(0,1fr))",
                },
                gap: 2,
                mt: 2,
              }}
            >
              <Typography>
                <strong>Estado:</strong>{" "}
                {
                  documento
                    .estado_documento
                    .nombre_estado_documento
                }
              </Typography>

              <Typography>
                <strong>Tipo:</strong>{" "}
                {
                  documento
                    .tipo_documento
                    .nombre_documento
                }
              </Typography>

              <Typography>
                <strong>Versión actual:</strong>{" "}
                V
                {
                  documento.version
                    .codigo_version
                }
              </Typography>

              <Typography>
                <strong>Revisión actual:</strong>{" "}
                {
                  documento.revision
                    .codigo_revision
                }
              </Typography>

              <Typography>
                <strong>Categoría:</strong>{" "}
                {
                  documento.categoria
                    .nombre_categoria
                }
              </Typography>

              <Typography>
                <strong>Infraestructura:</strong>{" "}
                {
                  documento.infraestructura
                    .nombre_infraestructura
                }
              </Typography>

              <Typography>
                <strong>Fase:</strong>{" "}
                {
                  documento.fase
                    .nombre_fase
                }
              </Typography>

              <Typography>
                <strong>Creado:</strong>{" "}
                {fechaLegible(
                  documento.fecha_creacion,
                )}
              </Typography>
            </Box>
          </Paper>

          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
              }}
              gutterBottom
            >
              Historial de versiones
            </Typography>

            {documento.documento_version
              .length === 0 ? (
              <Alert severity="info">
                Todavía no hay versiones históricas registradas.
              </Alert>
            ) : (
              <Paper
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Versión
                      </TableCell>

                      <TableCell>
                        Revisión
                      </TableCell>

                      <TableCell>
                        Fecha carga
                      </TableCell>

                      <TableCell>
                        Usuario
                      </TableCell>

                      <TableCell>
                        Comentario
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {documento.documento_version.map(
                      (version) => (
                        <TableRow
                          key={
                            version.id_doc_ver
                          }
                        >
                          <TableCell>
                            V
                            {
                              version.version
                                .codigo_version
                            }
                          </TableCell>

                          <TableCell>
                            {
                              version
                                .revision
                                .codigo_revision
                            }
                          </TableCell>

                          <TableCell>
                            {fechaLegible(
                              version.fecha_carga,
                            )}
                          </TableCell>

                          <TableCell>
                            {
                              version
                                .usuario
                                .nombre_usuario
                            }
                          </TableCell>

                          <TableCell>
                            {version.comentario ||
                              "—"}
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              </Paper>
            )}
          </Box>

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >

            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Comentarios
            </Typography>

            <Button
              variant="contained"
              onClick={() => setNuevoComentarioOpen(true)}
            >
              Nuevo comentario
            </Button>
          </Box>

            {comentarios.length === 0 ? (
              <Alert severity="info">
                Este documento no tiene comentarios.
              </Alert>
            ) : (
              <Stack spacing={2}>
                {comentarios.map((comentario) => (
                  <ComentarioCard
                    key={comentario.id_com_doc}
                    comentario={comentario}
                    onVerHistorial={verHistorial}
                    onAtender={atenderComentario}
                    onCerrar={cerrarComentario}
                  />
                ))}
              </Stack>
            )}
          </Box>
          <HistorialComentarioDialog
            open={dialogOpen}
            onClose={() =>
              setDialogOpen(false)
            }
            historial={historial}
          />

          <NuevoComentarioDialog
            open={nuevoComentarioOpen}
            onClose={() =>
              setNuevoComentarioOpen(false)
            }
            onGuardar={crearComentario}
          />
        </>
      )}
    </Stack>

  );

}