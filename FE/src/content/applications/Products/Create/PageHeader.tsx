import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Save } from '@mui/icons-material';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Add a new product
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ margin: 1 }}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<Save fontSize="small" />}
        >
          Save product
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
