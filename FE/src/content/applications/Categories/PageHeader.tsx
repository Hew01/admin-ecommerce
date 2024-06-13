import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useState } from 'react';
import AddCategoryDialog from './AddCategoriesDialog';

function PageHeader() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Categories
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small"/>}
          onClick={handleClickOpen}>
          Create Category
        </Button>
        <AddCategoryDialog open={open} handleClose={handleClose} />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
