import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Switch,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import 'react-quill/dist/quill.snow.css';
import RecentOrders from './RecentOrders';

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

function AddOrder() {
  const [currency, setCurrency] = useState('EUR');
  const [image, setImage] = useState(null);
  const theme = useTheme();
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
            <RecentOrders />
          </Grid>
          <Grid item md={4} xs={12}>
            <Card sx={{ overflow: 'visible' }}>
              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="h4" noWrap>
                    Customer Info
                  </Typography>
                  <Typography
                    variant="h4"
                    noWrap
                    color={theme.palette.primary.main}
                  >
                    Edit
                  </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h5" noWrap>
                    Alexandra David
                  </Typography>
                  <Typography variant="subtitle1" noWrap>
                    Customer ID: #88829509
                  </Typography>
                  <Typography
                    variant="body1"
                    color={theme.palette.success.dark}
                    sx={{ mt: 1 }}
                    noWrap
                  >
                    <IconButton
                      sx={{
                        color: theme.palette.success.main,
                        paddingRight: '15px'
                      }}
                      color="inherit"
                      size="small"
                    >
                      <ShoppingBasketIcon fontSize="small" />
                    </IconButton>
                    Orders: 13
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ pl: 3, pr: 3, pb: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="h4" noWrap>
                    Contact Info
                  </Typography>
                  <Typography
                    variant="h4"
                    noWrap
                    color={theme.palette.primary.main}
                  >
                    Edit
                  </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body1" noWrap>
                    <Typography variant="h5" component="span">
                      Email:{' '}
                    </Typography>
                    aaa@gmail.com
                  </Typography>
                  <Typography variant="body1" noWrap>
                    <Typography variant="h5" component="span">
                      Phone number:{' '}
                    </Typography>
                    0123456789
                  </Typography>
                </Box>
              </Box>
            </Card>
            <Card sx={{ overflow: 'visible', mt: 5 }}>
              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="h4" noWrap>
                    Shipping details
                  </Typography>
                  <Typography
                    variant="h4"
                    noWrap
                    color={theme.palette.primary.main}
                  >
                    Edit
                  </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body1">
                    <Typography variant="h5" component="span">
                      Address:{' '}
                    </Typography>
                    32 Lantern Street, 81 Dt., New York, USA
                  </Typography>
                  <Typography variant="body1" noWrap sx={{ mt: 1 }}>
                    <Typography variant="h5" component="span">
                      Shipping method:{' '}
                    </Typography>
                    GHTK - #2348jfali4eu
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ pl: 3, pr: 3, pb: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="h4" noWrap>
                    Billing details
                  </Typography>
                  <Typography
                    variant="h4"
                    noWrap
                    color={theme.palette.primary.main}
                  >
                    Edit
                  </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body1" noWrap>
                    Through credit card: (VCB)
                  </Typography>
                  <Typography variant="subtitle1" fontStyle={'italic'} noWrap>
                    Fullfilled
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddOrder;
