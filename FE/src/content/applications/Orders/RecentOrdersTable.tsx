import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { Order, OrderStatus } from 'src/models/order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { NavLink as RouterLink } from 'react-router-dom';

interface RecentOrdersTableProps {
  className?: string;
  orders: Order[];
}

interface Filters {
  status?: OrderStatus;
}

const getStatusLabel = (orderStatus: OrderStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    paid: {
      text: 'Paid',
      color: 'success'
    },
    standby: {
      text: 'Pending',
      color: 'warning'
    }
  };
  if (!map[orderStatus]) {
    console.error(`Invalid orderStatus: ${orderStatus}`);
    return null; // or return a default label
  }
  const { text, color }: any = map[orderStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  orders: Order[],
  filters: Filters
): Order[] => {
  return orders.filter((order) => {
    let matches = true;

    if (filters.status && order.orderStatus !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  orders: Order[],
  page: number,
  limit: number
): Order[] => {
  return orders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ orders }) => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'paid',
      name: 'Paid'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedOrders(
      event.target.checked
        ? orders.map((order) => order._id.$oid)
        : []
    );
  };

  const handleSelectOneOrder = (
    event: ChangeEvent<HTMLInputElement>,
    orderId: string
  ): void => {
    if (!selectedOrders.includes(orderId)) {
      setSelectedOrders((prevSelected) => [
        ...prevSelected,
        orderId
      ]);
    } else {
      setSelectedOrders((prevSelected) =>
        prevSelected.filter((id) => id !== orderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredOrders = applyFilters(orders, filters);
  const paginatedOrders = applyPagination(
    filteredOrders,
    page,
    limit
  );
  const selectedSomeOrders =
    selectedOrders.length > 0 &&
    selectedOrders.length < orders.length;
  const selectedAllOrders =
    selectedOrders.length === orders.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Recent Orders"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllOrders}
                  indeterminate={selectedSomeOrders}
                  onChange={handleSelectAllOrders}
                />
              </TableCell>
              <TableCell sx={{ width: '30%' }}>Order Status</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Source</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => {
              const isOrderSelected = selectedOrders.includes(
                order._id.$oid
              );
              return (
                <TableRow
                  hover
                  key={order._id.$oid}
                  selected={isOrderSelected}
                  component={RouterLink}
                  to={`edit/${order._id.$oid}`}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneOrder(event, order._id.$oid)
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
                      {order.orderSource}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {order.dateCreated}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {order._id.$oid}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {order.paymentMethod.methodName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {order.paymentMethod.transactionCode}
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
                      {numeral(order.totalAmount).format(
                        `$0,0.00`
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(order.orderStatus)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
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
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
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
