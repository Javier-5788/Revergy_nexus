import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography, } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import logoRevergy from "../../assets/1-revergy_cuadrado.jpg";
import "../../App.css";

const menuItems = [
  { label: "Mis proyectos", path: "/", icon: FolderOutlinedIcon },
  { label: "Resumen", path: "/dashboard", icon: DashboardOutlinedIcon },
  { label: "Documentos", path: "/documentos", icon: DescriptionOutlinedIcon },
  { label: "Comentarios", path: "/comentarios", icon: ChatBubbleOutlineIcon },
  { label: "TMT", path: "/tmt", icon: SendOutlinedIcon },
];

type SidebarProps = {
  onNavigate?: () => void;
};

export default function Sidebar({ onNavigate }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box className="sidebar-root">
      <Box className="sidebar-header">
        <Box
          component="img"
          src={logoRevergy}
          alt="Logo Revergy"
          translate="no"
          className="sidebar-logo"
        />
        <Typography variant="h6" className="sidebar-title">
          <Box translate="no">REVERGY NEXUS</Box>
        </Typography>
        <Typography variant="body2" color="text.secondary" className="sidebar-subtitle">
          Gestión documental
        </Typography>
      </Box>

      <Divider />

      <Typography
        variant="caption"
        color="text.secondary"
        className="sidebar-section-label"
      >
        PROYECTO
      </Typography>

      <List className="sidebar-nav-list" disablePadding>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const selected = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              selected={selected}
              onClick={() => {
                navigate(item.path);
                onNavigate?.();
              }}
              sx={{ mb: 0.5, borderRadius: 2 }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: "inherit" }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}