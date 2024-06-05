import {
  Box,
  Card,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';

function AddProduct() {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item md={9} xs={12}>
            <Card sx={{ overflow: 'visible' }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h4" noWrap>
                  Product Information
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" noWrap>
                    NAME*
                  </Typography>
                  <TextField
                    required
                    id="standard-required"
                    defaultValue="Hello World"
                    variant="standard"
                    fullWidth
                  />
                </Box>
                <Box display="flex" flexDirection='row' sx={{ mt: 3 }}>
                    <Box>
                  <Typography variant="subtitle1" noWrap>
                    AMOUNT*
                  </Typography>
                  <TextField
                    required
                    id="standard-required"
                    defaultValue="Hello World"
                    variant="standard"
                    fullWidth
                  />
                  </Box>
                  <Box>
                  <Typography variant="subtitle1" noWrap>
                    AMOUNT*
                  </Typography>
                  <TextField
                    required
                    id="standard-required"
                    defaultValue="Hello World"
                    variant="standard"
                    fullWidth
                  />
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card sx={{ overflow: 'visible' }}>a</Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddProduct;
