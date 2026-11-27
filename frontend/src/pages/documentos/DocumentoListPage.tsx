import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  } from "@mui/material";
import { useProyecto } from "../../context/ProyectoContext";
import { documentoService } from "../../services/documento.service";
import type { Documento } from "../../types/documento.types";
import DocumentTree from "../../components/documentos/DocumentTree";

export default function DocumentoListPage() {
  const { proyectoActivo } = useProyecto();
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const proyectoId = proyectoActivo?.proyecto_id;
  const navigate = useNavigate();

  useEffect(() => {
    if (!proyectoId) {
      setCargando(false);
      return;
    }

    const idProyecto = proyectoId;
    let vigente = true;

    async function cargarDocumentos() {
      setCargando(true);
      setError("");

      try {
        const resultado =
          await documentoService.obtenerPorProyecto(idProyecto);

        if (vigente) setDocumentos(resultado);
      } catch {
        if (vigente) {
          setError("No se pudieron cargar los documentos del proyecto.");
        }
      } finally {
        if (vigente) setCargando(false);
      }
    }

    void cargarDocumentos();

    return () => {
      vigente = false;
    };
  }, [proyectoId]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "300px 1fr",
        },
        gap: 3,
      }}
    >

      <DocumentTree
  documentos={
    documentos
  }
  onSelectDocumento={
    (documentoId) =>
      navigate(
        `/documentos/${documentoId}`,
      )
  }
/>

      <Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {cargando ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 6,
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? null : documentos.length === 0 ? (
          <Alert severity="info">
            Este proyecto todavía no tiene documentos registrados.
          </Alert>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 3,
            }}
          >
            <Table>

              <TableHead>

                <TableRow>

                  <TableCell>
                    Código
                  </TableCell>

                  <TableCell>
                    Nombre
                  </TableCell>

                  <TableCell>
                    Tipo
                  </TableCell>

                  <TableCell>
                    Estado
                  </TableCell>

                  <TableCell>
                    Fecha de creación
                  </TableCell>

                </TableRow>

              </TableHead>

              <TableBody>

                {documentos.map(
                  (documento) => (

                    <TableRow
                      key={
                        documento.id_documento
                      }
                      hover
                      sx={{
                        cursor:
                          "pointer",
                      }}
                      onClick={() =>
                        navigate(
                          `/documentos/${documento.id_documento}`,
                        )
                      }
                    >

                      <TableCell>
                        {
                          documento.codigo_documento
                        }
                      </TableCell>

                      <TableCell>
                        {
                          documento.nombre_documento
                        }
                      </TableCell>

                      <TableCell>
                        {
                          documento
                            .tipo_documento
                            .nombre_documento
                        }
                      </TableCell>

                      <TableCell>
                        {
                          documento
                            .estado_documento
                            .nombre_estado_documento
                        }
                      </TableCell>

                      <TableCell>
                        {new Intl.DateTimeFormat(
                          "es-CO",
                          {
                            dateStyle:
                              "medium",
                          },
                        ).format(
                          new Date(
                            documento.fecha_creacion,
                          ),
                        )}
                      </TableCell>

                    </TableRow>

                  ),
                )}

              </TableBody>

            </Table>
          </TableContainer>
        )}

      </Box>

    </Box>
  );
}