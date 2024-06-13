import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const currencies = [
  {
    value: 'USD',
    label: '$'
  },
  {
    value: 'EUR',
    label: '€'
  },
  {
    value: 'BTC',
    label: '฿'
  },
  {
    value: 'JPY',
    label: '¥'
  }
];

function AddProduct() {
  const [currency, setCurrency] = useState('EUR');
  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();

    // validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    reader.onloadend = function () {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };
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
          <Grid item md={8} xs={12}>
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
                    variant="standard"
                    fullWidth
                  />
                </Box>
                <Box display="flex" flexDirection="row" sx={{ mt: 3 }} gap={6}>
                  <Box flexGrow={1}>
                    <Typography variant="subtitle1" noWrap>
                      BRAND
                    </Typography>
                    <TextField
                      required
                      id="standard-required"
                      variant="standard"
                      type="number"
                      fullWidth
                    />
                  </Box>
                  <Box flexGrow={1}>
                    <Typography variant="subtitle1" noWrap>
                      PRICE*
                    </Typography>
                    <TextField
                      required
                      id="standard-required"
                      variant="standard"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        )
                      }}
                      fullWidth
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" noWrap>
                    DESCRIPTION
                  </Typography>
                  <Box sx={{ mt: 1}}>
                    <TextField
                      multiline
                      rows={4}
                      defaultValue=""
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" noWrap>
                    DETAIL INFO
                  </Typography>
                  <Box sx={{ mt: 1}}>
                    <TextField
                      multiline
                      rows={4}
                      defaultValue=""
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card sx={{ overflow: 'visible' }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h4" noWrap>
                  Inventory
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" noWrap>
                    Category
                  </Typography>
                  <TextField
                    id="standard-select-currency"
                    select
                    value={currency}
                    onChange={handleChange}
                    variant="standard"
                    fullWidth
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" noWrap>
                    Amount*
                  </Typography>
                  <TextField
                    id="standard"
                    value={currency}
                    onChange={handleChange}
                    variant="standard"
                    fullWidth
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" noWrap>
                    Status
                  </Typography>
                  <TextField
                    id="standard-select-currency"
                    select
                    value={currency}
                    onChange={handleChange}
                    variant="standard"
                    fullWidth
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  sx={{ mt: 3, mr: -1 }}
                >
                  <Typography variant="subtitle1" noWrap>
                    In stock
                  </Typography>
                  <Switch />
                </Box>
              </Box>
            </Card>
            <Card sx={{ overflow: 'visible', mt: 5 }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h4" noWrap>
                  Image
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    border: '1px dashed grey',
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {!image ? (
                    <>
                      <Typography variant="subtitle1">
                        Drag and drop your image here
                      </Typography>
                      <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
                        or
                      </Typography>
                      <Button variant="contained" component="label">
                        Browse Image
                        <input
                          type="file"
                          hidden
                          onChange={handleUploadClick}
                        />
                      </Button>
                    </>
                  ) : (
                    <>
                      <img
                        src={image}
                        alt="preview"
                        style={{
                          marginTop: '20px',
                          maxHeight: '200px',
                          width: '100%'
                        }}
                      />
                      <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 3 }}
                      >
                        Choose another image
                        <input
                          type="file"
                          hidden
                          onChange={handleUploadClick}
                        />
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddProduct;
