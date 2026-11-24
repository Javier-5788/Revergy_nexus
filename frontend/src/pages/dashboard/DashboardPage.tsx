import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useProyecto } from "../../context/ProyectoContext";
import {
  dashboardService,
  type ResumenProyecto,
} from "../../services/dashboard.service";

export default function DashboardPage() {
  const { proyectoActivo } = useProyecto();
  const [resumen, setResumen] = useState<ResumenProyecto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

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

  const metricasDocumentos = [
    { titulo: "Total documentos", valor: resumen?.totalDocumentos ?? 0 },
    { titulo: "Documentos abiertos", valor: resumen?.documentosAbiertos ?? 0 },
    { titulo: "Documentos cerrados", valor: resumen?.documentosCerrados ?? 0 },
    { titulo: "Documentos vencidos", valor: resumen?.documentosVencidos ?? 0 },
    {
      titulo: "Pendientes de entrega",
      valor: resumen?.documentosPendientesEntrega ?? 0,
    },
  ];

  const metricasComentarios = [
    { titulo: "Abiertos", valor: resumen?.comentariosAbiertos ?? 0 },
    { titulo: "Atendidos", valor: resumen?.comentariosAtendidos ?? 0 },
    { titulo: "Cerrados", valor: resumen?.comentariosCerrados ?? 0 },
  ];

  const metricasTmt = [
    { titulo: "Emitidos", valor: resumen?.tmtEmitidos ?? 0 },
    { titulo: "Recibidos", valor: resumen?.tmtRecibidos ?? 0 },
  ];

  function renderMetricas(
    metricas: {
      titulo: string;
      valor: number;
    }[],
  ) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(5, minmax(0, 1fr))",
          },
          gap: 2,
        }}
      >
        {metricas.map((metrica) => (
          <Card
            key={metrica.titulo}
            sx={{
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {metrica.titulo}
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mt: 1,
                }}
              >
                {metrica.valor}
              </Typography>

            </CardContent>

          </Card>
        ))}
      </Box>
    );
  }

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
              📁 Estado Documental
            </Typography>

            {renderMetricas(
              metricasDocumentos,
            )}

          </Box>

          <Box>

            <Typography
              variant="h5"
              sx={{ fontWeight: 700 }}
              gutterBottom
            >
              💬 Comentarios
            </Typography>

            {renderMetricas(
              metricasComentarios,
            )}

          </Box>

          <Box>

            <Typography
              variant="h5"
              sx={{ fontWeight: 700 }}
              gutterBottom
            >
              📦 TMT
            </Typography>

            {renderMetricas(
              metricasTmt,
            )}

          </Box>

        </Stack>
      ) : null}
    </Stack>
  );
}