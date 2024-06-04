import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Orders
        </Typography>
      </Grid>
      <Grid item>
        <Button

          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Create orders
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;