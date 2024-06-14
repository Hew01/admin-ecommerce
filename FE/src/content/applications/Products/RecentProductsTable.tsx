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
import { Product, ProductStatus } from 'src/models/product';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { NavLink as RouterLink } from 'react-router-dom';

interface RecentProductsTableProps {
  className?: string;
  products: Product[];
}

interface Filters {
  status?: ProductStatus;
}

const getStatusLabel = (productStatus: ProductStatus): JSX.Element => {
  const map = {
    inactive: {
      text: 'Inactive',
      color: 'error'
    },
    scheduled: {
      text: 'Scheduled',
      color: 'warning'
    },
    published: {
      text: 'Published',
      color: 'success'
    }
  };

  const { text, color }: any = map[productStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (products: Product[], filters: Filters): Product[] => {
  return products.filter((product) => {
    let matches = true;

    if (filters.status && product.publishStatus !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  products: Product[],
  page: number,
  limit: number
): Product[] => {
  return products.slice(page * limit, page * limit + limit);
};

const RecentProductsTable: FC<RecentProductsTableProps> = ({ products }) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const selectedBulkActions = selectedProducts.length > 0;
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
      id: 'published',
      name: 'Published'
    },
    {
      id: 'inactive',
      name: 'Inactive'
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

  const handleSelectAllProducts = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedProducts(
      event.target.checked ? products.map((product) => product._id) : []
    );
  };

  const handleSelectOneProduct = (
    event: ChangeEvent<HTMLInputElement>,
    productId: string
  ): void => {
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts((prevSelected) => [...prevSelected, productId]);
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((id) => id !== productId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredProducts = applyFilters(products, filters);
  const paginatedProducts = applyPagination(filteredProducts, page, limit);
  const selectedSomeProducts =
    selectedProducts.length > 0 && selectedProducts.length < products.length;
  const selectedAllProducts = selectedProducts.length === products.length;
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
          title="Recent Products"
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
                  checked={selectedAllProducts}
                  indeterminate={selectedSomeProducts}
                  onChange={handleSelectAllProducts}
                />
              </TableCell>
              <TableCell sx={{ width: '30%' }}>Products</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((product) => {
              const isProductSelected = selectedProducts.includes(product._id);
              return (
                <TableRow
                  hover
                  key={product._id}
                  selected={isProductSelected}
                  component={RouterLink}
                  to={`edit/${product._id}`}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isProductSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneProduct(event, product._id)
                      }
                      value={isProductSelected}
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
                      {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {product.brand}
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
                      {product.category}
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
                      {product.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      Instock: {product.instockStatus ? 'Yes' : 'No'}
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
                      {numeral(product.price).format(`$0,0.00`)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(product.publishStatus)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Product" arrow>
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
                    <Tooltip title="Delete Product" arrow>
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
          count={filteredProducts.length}
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

RecentProductsTable.propTypes = {
  products: PropTypes.array.isRequired
};

RecentProductsTable.defaultProps = {
  products: []
};

export default RecentProductsTable;
