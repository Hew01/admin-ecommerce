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
  Tooltip
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
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
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addingProduct && (
              <TableRow>
                <TableCell>
                  <Box flexDirection="row" display="flex" alignItems="center">
                  <Tooltip title="Edit Order" arrow>
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
                      <EditTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Order" arrow>
                    <IconButton
                      onClick={handleCancelAddProduct}
                      sx={{
                        '&:hover': { background: theme.colors.error.lighter },
                        color: theme.palette.error.main
                      }}
                      color="inherit"
                      size="small"
                    >
                      <DeleteTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  </Box>
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, product: e.target.value })
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, product: e.target.value })
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, product: e.target.value })
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, product: e.target.value })
                    }
                  />
                </TableCell>
              </TableRow>
            )}
            {!addingProduct && (
              <TableRow onClick={handleAddProduct}>
                <TableCell padding='checkbox'/>
                <TableCell colSpan={6}>Add product...</TableCell>
              </TableRow>
            )}
            {/* {orders.map((order) => {
              const isOrderSelected = selectedOrders.includes(
                order.id
              );
              return (
                <TableRow
                  hover
                  key={order.id}
                  selected={isOrderSelected}
                >
                  <TableCell padding="checkbox">
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
            })} */}
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
