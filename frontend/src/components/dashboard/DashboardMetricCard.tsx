import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

type DashboardMetricCardProps = {
  titulo: string;
  valor: number;
  ruta?: string;
};

export default function DashboardMetricCard({
  titulo,
  valor,
  ruta,
}: DashboardMetricCardProps) {
  const navigate = useNavigate();

  const clickable = Boolean(ruta);

  return (
    <Card
      onClick={() => {
        if (ruta) {
          navigate(ruta);
        }
      }}
      sx={{
        borderRadius: 3,
        cursor: clickable
          ? "pointer"
          : "default",

        transition:
          "all .2s ease",

        "&:hover": clickable
          ? {
              transform:
                "translateY(-3px)",

              boxShadow: 6,
            }
          : {},
      }}
    >
      <CardContent>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {titulo}
        </Typography>

        <Typography
          variant="h3"
          sx={{
            mt: 1,
            fontWeight: 700,
          }}
        >
          {valor}
        </Typography>

      </CardContent>
    </Card>
  );
}