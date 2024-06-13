import { Typography, Button, Grid } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
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
          component={RouterLink}
          variant="contained"
          to="add"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Create order
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
