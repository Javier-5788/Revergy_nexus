import { AppBar, IconButton, Toolbar, Typography, Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useNavigate } from "react-router-dom";
import { useProyecto } from "../../context/ProyectoContext";


type TopbarProps = {
    onMenuClick: () => void;
};

export default function Topbar({ onMenuClick }: TopbarProps) {
    const { proyectoActivo } = useProyecto();
    const navigate = useNavigate();

    return (
        <AppBar
            position="sticky"
            color="inherit"
            elevation={0}
            sx={{ borderBottom: 1, borderColor: "divider" }}
        >
            <Toolbar>
                <IconButton
                    onClick={onMenuClick}
                    edge="start"
                    aria-label="Abrir menú"
                    sx={{ display: { xs: "inline-flex", md: "none" }, mr: 1 }}
                >
                    <MenuIcon />
                </IconButton>

                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="body2" color="text.secondary">
                        {proyectoActivo ? "Proyecto activo" : "Gestión de proyectos"}
                    </Typography>
                    {proyectoActivo && (
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
                            {proyectoActivo.nombre_proyecto}
                        </Typography>
                    )}
                </Box>

                {proyectoActivo && (
                    <Button
                        size="small"
                        startIcon={<SwapHorizIcon />}
                        onClick={() => navigate("/")}
                    >
                        Cambiar proyecto
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}