import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

export default function DashboardPage() {

  return (

    <>
      <Typography
        variant="h4"
        gutterBottom
      >
        Dashboard
      </Typography>

      <Grid container spacing={2}>

        <Grid size={3}>

          <Card>

            <CardContent>

              <Typography>

                Documentos

              </Typography>

              <Typography variant="h4">

                1

              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid size={3}>

          <Card>

            <CardContent>

              <Typography>

                Comentarios

              </Typography>

              <Typography variant="h4">

                0

              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid size={3}>

          <Card>

            <CardContent>

              <Typography>

                TMT

              </Typography>

              <Typography variant="h4">

                0

              </Typography>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

    </>
  );

}