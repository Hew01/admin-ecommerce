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
import { useEffect, useState } from 'react';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import 'react-quill/dist/quill.snow.css';
import { useStore } from 'src/store/order';
import { Order } from 'src/models/order';
import RecentOrdersTable from './RecentOrdersTable';
import apiFetch from 'src/utils/apiConfig';

function EditOrder({orderId}: {orderId: string}) {
  const customerId = useStore((state) => state.customerId);
  const setCustomerId = useStore((state) => state.setCustomerId);

  const dateCreated = useStore((state) => state.dateCreated);
  const setDateCreated = useStore((state) => state.setDateCreated);

  const finalAmount = useStore((state) => state.finalAmount);
  const setFinalAmount = useStore((state) => state.setFinalAmount);

  const orderNote = useStore((state) => state.orderNote);
  const setOrderNote = useStore((state) => state.setOrderNote);

  const orderSource = useStore((state) => state.orderSource);
  const setOrderSource = useStore((state) => state.setOrderSource);

  const orderStatus = useStore((state) => state.orderStatus);
  const setOrderStatus = useStore((state) => state.setOrderStatus);

  const orderType = useStore((state) => state.orderType);
  const setOrderType = useStore((state) => state.setOrderType);

  const paymentMethod = useStore((state) => state.paymentMethod);
  const setPaymentMethod = useStore((state) => state.setPaymentMethod);

  const productList = useStore((state) => state.productList);
  const setProductList = useStore((state) => state.setProductList);

  const shipAddress = useStore((state) => state.shipAddress);
  const setShipAddress = useStore((state) => state.setShipAddress);

  const shippingStatus = useStore((state) => state.shippingStatus);
  const setShippingStatus = useStore((state) => state.setShippingStatus);

  const totalAmount = useStore((state) => state.totalAmount);
  const setTotalAmount = useStore((state) => state.setTotalAmount);

  const [order, setOrder] = useState<Order>(null);
  const [product, setProduct] = useState<any[]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Add this line
        const response = await apiFetch('orders/' + orderId, '');
        setOrder(response);
        setCustomerId(response.customerId);
        setDateCreated(response.dateCreated);
        setFinalAmount(response.finalAmount);
        setOrderNote(response.orderNote);
        setOrderSource(response.orderSource);
        setOrderStatus(response.orderStatus);
        setOrderType(response.orderType);
        setPaymentMethod(response.paymentMethod);
        setProductList(response.productList);
        setShipAddress(response.shipAddress);
        setShippingStatus(response.shippingStatus);
        setTotalAmount(response.totalAmount);
        setIsLoading(false); // Add this line
      } catch (error) {
        setIsLoading(false); // Add this line
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

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
            <Card>
              <RecentOrdersTable products={productList} />
            </Card>
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

export default EditOrder;
