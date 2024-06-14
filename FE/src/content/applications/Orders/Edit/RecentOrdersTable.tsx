import { FC, ChangeEvent, useState, useCallback, useEffect } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Divider,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Autocomplete
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { Product } from 'src/models/product';
import BulkActions from './BulkActions';
import apiFetch from 'src/utils/apiConfig';
interface RecentOrdersTableProps {
  className?: string;
  products: {
    productID: string;
    quantity: number;
  } [];
}

type FullProduct = {
    productID: string;
    quantity: number;
    name: string;
    price: number;
}

type ShortenedProduct = {
  productID: string;
  quantity: number;
}
const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ products }) => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [addingProduct, setAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<ShortenedProduct | null>(null);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(false);
  const [productFulls, setProductFulls] = useState<FullProduct[] | null>([]);
  const [productNames, setProductNames] = useState<string[]>([]);
  useEffect(() => {
    const getShortenedProduct = async (product: ShortenedProduct) => {
      console.log(product);
      const response = await apiFetch('products/' + product.productID, '');
      return {
        ...product,
        name: response.productName,
        price: response.price,
      };
    };

    Promise.all(products.map(product => getShortenedProduct(product)))
      .then(shortenedProducts => {
        setProductFulls(shortenedProducts);
      });
  }, [products]);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await apiFetch('products/all', '');
        const productNames = response.map(product => product.productName);
        setProductNames(productNames);
        console.log(productNames);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    

    fetchData();
  }, []);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue <= 0 && inputValue.toString() !== '') {
      setError(true);
    } else {
      setError(false);
    }
  };
  const selectedBulkActions = selectedOrders.length > 0;
  const handleSelectAllOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedOrders(
      event.target.checked ? products.map((product) => product.productID) : []
    );
  };

  const handleSelectOneOrder = (
    event: ChangeEvent<HTMLInputElement>,
    productID: string
  ): void => {
    if (!selectedOrders.includes(productID)) {
      setSelectedOrders((prevSelected) => [...prevSelected, productID]);
    } else {
      setSelectedOrders((prevSelected) =>
        prevSelected.filter((id) => id !== productID)
      );
    }
  };
  const selectedSomeOrders =
    selectedOrders.length > 0 && selectedOrders.length < products.length;
  const selectedAllOrders = selectedOrders.length === products.length;
  const theme = useTheme();
  const handleAddProduct = () => {
    setAddingProduct(true);
  };

  const handleCancelAddProduct = () => {
    setAddingProduct(false);
    setNewProduct(null);
  };

  const handleDoneAddProduct = () => {
    if (newProduct) {
      products.push(newProduct);
      setNewProduct(null);
    }
    setAddingProduct(false);
  };
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 }
    // The rest of your list
  ];
  
  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" noWrap>
            Order details
          </Typography>
        </Box>
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="normal">
                <Checkbox
                  color="primary"
                  checked={selectedAllOrders}
                  indeterminate={selectedSomeOrders}
                  onChange={handleSelectAllOrders}
                />
              </TableCell>
              <TableCell sx={{ width: '40%' }}>Product</TableCell>
              <TableCell sx={{ width: '15%' }} align="right">
                Price
              </TableCell>
              <TableCell sx={{ width: '15%' }} align="right">
                Amount
              </TableCell>
              <TableCell sx={{ width: '15%' }} align="right">
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {products.map((product, index) => {
              const isOrderSelected = selectedOrders.includes(
                product.productID
              );
              return (
                <TableRow
                  hover
                  key={product.productID}
                  selected={isOrderSelected}
                >
                  <TableCell padding="checkbox" sx={{paddingLeft: 1.6}}>
                    <Checkbox
                      color="primary"
                      checked={isOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneOrder(event, product.productID)
                      }
                      value={isOrderSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {productFulls[index]?.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {numeral(productFulls[index]?.price).format(
                        `$0,0.00`
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {productFulls[index]?.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {numeral(productFulls[index]?.price * productFulls[index]?.quantity).format('$0,0.00')
}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
            {addingProduct && (
              <TableRow>
                <TableCell>
                  <Box flexDirection="row" display="flex" alignItems="center">
                    <Tooltip title="Save" arrow>
                      <IconButton
                        onClick={handleDoneAddProduct}
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <SaveIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel" arrow>
                      <IconButton
                        onClick={handleCancelAddProduct}
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell>
                  <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    id="free-solo"
                    freeSolo
                    options={productNames}
                    getOptionLabel={(option) => option}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        <Typography variant="body1">{option}</Typography>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Tooltip
                    open={error}
                    title="Do not input that number"
                    placement="right"
                  >
                    <TextField
                      variant="outlined"
                      type="number"
                      value={value}
                      onChange={handleChange}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
            {!addingProduct && (
              <TableRow sx={{ cursor: 'pointer' }} onClick={handleAddProduct}>
                <TableCell padding="checkbox"/>
                <TableCell colSpan={6}>
                  <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    + Add product...
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell/>
              <TableCell>
                <Typography variant="h3">Total</Typography>
              </TableCell>
              <TableCell/>
              <TableCell/>
              <TableCell align='right'>
                <Typography variant='h3'>${numeral(0).format('0,0.00')}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  products: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  products: []
};

export default RecentOrdersTable;
