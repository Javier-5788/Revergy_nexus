import { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { proyectoService } from "../../services/proyecto.service";
import { useProyecto } from "../../context/ProyectoContext";
import type { ProyectoAsignado } from "../../types/proyecto.types";

type ApiError = {
    response?: {
        data?: {
            message?: string;
        };
    };
};

function mostrarEstado(estado: string) {
  const etiquetas: Record<string, string> = {
    Planificaci_n: "Planificación",
    En_Ejecuci_n: "En ejecución",
    Suspendido: "Suspendido",
    Cerrado: "Cerrado",
  };

  return etiquetas[estado] ?? estado.replaceAll("_", " ");
}

function mostrarEspecialidad(especialidad: string) {
  const etiquetas: Record<string, string> = {
    Solar: "Solar",
    Eolico: "Eólico",
    Bess: "BESS",
    Sets: "SETS",
  };

  return etiquetas[especialidad] ?? especialidad.replaceAll("_", " ");
}

export default function MisProyectosPage() {
    const [proyectos, setProyectos] = useState<ProyectoAsignado[]>([]);
    const [cargando, setCargando] = useState(true);
    const [seleccionando, setSeleccionando] = useState<number | null>(null);
    const [error, setError] = useState("");

    const { setProyectoActivo } = useProyecto();
    const navigate = useNavigate();

    useEffect(() => {
        let vigente = true;

        async function cargarProyectos() {
            try {
                const resultado = await proyectoService.obtenerMisProyectos();
                if (vigente) setProyectos(resultado);
            } catch {
                if (vigente) {
                    setError("No se pudieron cargar tus proyectos. Inténtalo de nuevo.");
                }
            } finally {
                if (vigente) setCargando(false);
            }
        }

        void cargarProyectos();

        return () => {
            vigente = false;
        };
    }, []);

    async function activarProyecto(id: number) {
        setSeleccionando(id);
        setError("");

        try {
            const proyecto = await proyectoService.seleccionarProyecto(id);
            setProyectoActivo(proyecto);
            navigate("/dashboard");
        } catch (err) {
            const mensaje = (err as ApiError).response?.data?.message;
            setError(
                typeof mensaje === "string"
                    ? mensaje
                    : "No se pudo activar el proyecto. Inténtalo de nuevo.",
            );
        } finally {
            setSeleccionando(null);
        }
    }

    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
                    Mis proyectos
                </Typography>
                <Typography color="text.secondary">
                    Selecciona un proyecto para consultar su información documental.
                </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            {cargando ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                    <CircularProgress />
                </Box>
            ) : proyectos.length === 0 ? (
                <Alert severity="info">
                    No tienes proyectos asignados actualmente.
                </Alert>
            ) : (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, minmax(0, 1fr))",
                            xl: "repeat(3, minmax(0, 1fr))",
                        },
                        gap: 2,
                    }}
                >
                    {proyectos.map(({ proyecto, rol }) => (
                        <Card key={proyecto.id_proyecto} sx={{ borderRadius: 3 }}>
                            <CardActionArea
                                onClick={() => void activarProyecto(proyecto.id_proyecto)}
                                disabled={seleccionando !== null}
                                sx={{ height: "100%" }}
                            >
                                <CardContent sx={{ p: 2.5 }}>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{
                                            mb: 2,
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Chip
                                            label={proyecto.codigo_proyecto}
                                            color="primary"
                                            size="small"
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            {seleccionando === proyecto.id_proyecto
                                                ? "Abriendo…"
                                                : rol.nombre}
                                        </Typography>
                                    </Stack>

                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 700 }}
                                        gutterBottom
                                    >
                                        {proyecto.nombre_proyecto}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {mostrarEspecialidad(proyecto.especialidad)}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        Estado: {mostrarEstado(proyecto.estado_proyecto)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>
            )}
        </Stack>
    );
}