import { FC, ChangeEvent, useState } from 'react';
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
import { Order } from 'src/models/order';
import BulkActions from './BulkActions';

interface RecentOrdersTableProps {
  className?: string;
  orders: Order[];
}
const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ orders }) => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [addingProduct, setAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Order | null>(null);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(false);

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
      event.target.checked ? orders.map((order) => order.id) : []
    );
  };

  const handleSelectOneOrder = (
    event: ChangeEvent<HTMLInputElement>,
    orderId: string
  ): void => {
    if (!selectedOrders.includes(orderId)) {
      setSelectedOrders((prevSelected) => [...prevSelected, orderId]);
    } else {
      setSelectedOrders((prevSelected) =>
        prevSelected.filter((id) => id !== orderId)
      );
    }
  };
  const selectedSomeOrders =
    selectedOrders.length > 0 && selectedOrders.length < orders.length;
  const selectedAllOrders = selectedOrders.length === orders.length;
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
      orders.push(newProduct);
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
          {orders.map((order) => {
              const isOrderSelected = selectedOrders.includes(
                order.id
              );
              return (
                <TableRow
                  hover
                  key={order.id}
                  selected={isOrderSelected}
                >
                  <TableCell padding="checkbox" sx={{paddingLeft: 1.6}}>
                    <Checkbox
                      color="primary"
                      checked={isOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneOrder(event, order.id)
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
                      {order.orderDetails}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(order.orderDate, 'MMMM dd yyyy')}
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
                      {order.orderID}
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
                      {order.sourceName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {order.sourceDesc}
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
                      {numeral(order.amount).format(
                        `${order.currency}0,0.00`
                      )}
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
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        <Typography variant="body1">{option.title}</Typography>
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
  orders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  orders: []
};

export default RecentOrdersTable;
