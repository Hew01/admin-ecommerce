import {
  Typography,
  Button,
  Grid,
  Tooltip,
  IconButton,
  Box
} from '@mui/material';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { Save } from '@mui/icons-material';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item display="flex">
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2, ml: -2 }}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box alignContent="center">
          <Typography variant="h3" component="h3" gutterBottom>
            Add a new product
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Button sx={{ margin: 1 }} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button variant="contained" startIcon={<Save fontSize="small" />}>
          Save product
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
