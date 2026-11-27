import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useProyecto } from "../../context/ProyectoContext";
import {
  dashboardService,
  type ResumenProyecto,
} from "../../services/dashboard.service";
import { useNavigate } from "react-router-dom";
import DashboardMetricCard from "../../components/dashboard/DashboardMetricCard";


export default function DashboardPage() {
  const { proyectoActivo } = useProyecto();
  const [resumen, setResumen] = useState<ResumenProyecto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const proyectoId = proyectoActivo?.proyecto_id;
  

  useEffect(() => {
    if (!proyectoId) {
      setCargando(false);
      return;
    }

    const idProyecto = proyectoId;
    let vigente = true;

    async function cargarResumen() {
      setCargando(true);
      setError("");

      try {
        const datos = await dashboardService.obtenerResumen(idProyecto);
        if (vigente) setResumen(datos);
      } catch {
        if (vigente) {
          setError("No se pudo cargar el resumen del proyecto.");
        }
      } finally {
        if (vigente) setCargando(false);
      }
    }

    void cargarResumen();

    return () => {
      vigente = false;
    };
  }, [proyectoId]);


  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
          Resumen del proyecto
        </Typography>
        <Typography color="text.secondary">
          {proyectoActivo?.nombre_proyecto}
        </Typography>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {cargando ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : !error && resumen ? (
        <Stack spacing={4}>

          <Box>

            <Typography
              variant="h5"
              sx={{ fontWeight: 700 }}
              gutterBottom
            >
              Estado Documental
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  lg: "2fr 1fr",
                },
                gap: 2,
              }}
            >

              {/* PANEL IZQUIERDO */}

              <Box
                sx={{
                  display: "grid",
                  gridTemplateRows: "1fr 1fr",
                  gap: 2,
                }}
              >

                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                  }}
                >

                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                    }}
                  >
                    Estado de documentos
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(3, minmax(0,1fr))",
                      gap: 2,
                    }}
                  >

                    <DashboardMetricCard
                      titulo="Abiertos"
                      valor={
                        resumen?.documentosAbiertos ?? 0
                      }
                      ruta="/documentos?estado=abierto"
                    />

                    <DashboardMetricCard
                      titulo="Rechazados"
                      valor={
                        resumen?.documentosRechazados ?? 0
                      }
                      ruta="/documentos?estado=rechazado"
                    />

                    <DashboardMetricCard
                      titulo="Cerrados"
                      valor={
                        resumen?.documentosCerrados ?? 0
                      }
                      ruta="/documentos?estado=cerrado"
                    />

                  </Box>

                </Paper>

                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                  }}
                >

                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                    }}
                  >
                    Seguimiento
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(2,minmax(0,1fr))",
                      gap: 2,
                    }}
                  >

                    <DashboardMetricCard
                      titulo="Vencidos"
                      valor={
                        resumen?.documentosVencidos ?? 0
                      }
                      ruta="/documentos?estado=vencido"
                    />

                    <DashboardMetricCard
                      titulo="Pendientes entrega"
                      valor={
                        resumen?.documentosPendientesEntrega ?? 0
                      }
                      ruta="/documentos?estado=pendiente-entrega"
                    />

                  </Box>

                </Paper>

              </Box>

              {/* PANEL DERECHO */}

              <Paper
                onClick={() =>
                  navigate("/documentos")
                }
                sx={{
                  cursor: "pointer",
                  borderRadius: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  minHeight: 270,
                  transition: "0.2s",
                  "&:hover": {
                    boxShadow: 4,
                    transform: "translateY(-4px)",
                  },
                }}
              >

                <Typography
                  variant="h6"
                  color="text.secondary"
                >
                  TOTAL DOCUMENTOS
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: {
                      xs: "4rem",
                      md: "6rem",
                    },
                    mt: 2,
                  }}
                >
                  {resumen?.totalDocumentos ?? 0}
                </Typography>

              </Paper>

            </Box>

          </Box>
          <Box>

            <Typography
              variant="h5"
              sx={{ fontWeight: 700 }}
              gutterBottom
            >
              Comentarios
            </Typography>

            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
              }}
            >

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(3, 1fr)",
                  },
                  gap: 2,
                }}
              >

                <DashboardMetricCard
                  titulo="Abiertos"
                  valor={
                    resumen?.comentariosAbiertos ?? 0
                  }
                  ruta="/comentarios?estado=abierto"
                />

                <DashboardMetricCard
                  titulo="Atendidos"
                  valor={
                    resumen?.comentariosAtendidos ?? 0
                  }
                  ruta="/comentarios?estado=atendido"
                />

                <DashboardMetricCard
                  titulo="Cerrados"
                  valor={
                    resumen?.comentariosCerrados ?? 0
                  }
                  ruta="/comentarios?estado=cerrado"
                />

              </Box>

            </Paper>

          </Box>

          <Box>

            <Typography
              variant="h5"
              sx={{ fontWeight: 700 }}
              gutterBottom
            >
              TMT
            </Typography>

            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
              }}
            >

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, 1fr)",
                  },
                  gap: 2,
                }}
              >

                <DashboardMetricCard
                  titulo="Emitidos"
                  valor={
                    resumen?.tmtEmitidos ?? 0
                  }
                  ruta="/tmt?estado=emitido"
                />

                <DashboardMetricCard
                  titulo="Recibidos"
                  valor={
                    resumen?.tmtRecibidos ?? 0
                  }
                  ruta="/tmt?estado=recibido"
                />

              </Box>

            </Paper>

          </Box>

        </Stack>
      ) : null}
    </Stack>
  );
}