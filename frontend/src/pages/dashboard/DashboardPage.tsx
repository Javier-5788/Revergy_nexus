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
import { dashboardService, type ResumenProyecto, } from "../../services/dashboard.service";

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

  const metricas = [
    { titulo: "Documentos", valor: resumen?.totalDocumentos },
    { titulo: "Comentarios abiertos", valor: resumen?.comentariosAbiertos },
    { titulo: "Comentarios atendidos", valor: resumen?.comentariosAtendidos },
    { titulo: "TMT generados", valor: resumen?.totalTmt },
  ];

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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              xl: "repeat(4, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {metricas.map((metrica) => (
            <Card key={metrica.titulo} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="body2" color="text.secondary">
                  {metrica.titulo}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, mt: 1 }}>
                  {metrica.valor}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : null}
    </Stack>
  );
}