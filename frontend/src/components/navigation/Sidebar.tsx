import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useLocation, useNavigate } from "react-router-dom";

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
    <Box component="nav" aria-label="Navegación principal">
      <Box sx={{ px: 2.5, py: 3 }}>
        <Typography variant="h6" sx={{ color: "primary.main", fontWeight: 800 }}>
          REVERGY NEXUS
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gestión documental
        </Typography>
      </Box>

      <Divider />

      <Typography
        variant="caption"
        sx={{ display: "block", px: 2.5, pt: 3, pb: 1, color: "text.secondary" }}
      >
        PROYECTO
      </Typography>

      <List sx={{ px: 1.5, pt: 0 }}>
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