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
import { Category } from 'src/models/category';
import BulkActions from './BulkActions';
import EditCategoryDialog from './EditCategoriesDialog';

interface RecentCategoriesTableProps {
  className?: string;
  categories: Category[];
}
const RecentCategoriesTable: FC<RecentCategoriesTableProps> = ({ categories }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [addingProduct, setAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Category | null>(null);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = (id) => {
    setOpen(true);
    setValue(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue <= 0 && inputValue.toString() !== '') {
      setError(true);
    } else {
      setError(false);
    }
  };
  const selectedBulkActions = selectedCategories.length > 0;
  const handleSelectAllCategories = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCategories(
      event.target.checked ? categories.map((category) => category._id) : []
    );
  };

  const handleSelectOneCategory = (
    event: ChangeEvent<HTMLInputElement>,
    categoryId: string
  ): void => {
    if (!selectedCategories.includes(categoryId)) {
      setSelectedCategories((prevSelected) => [...prevSelected, categoryId]);
    } else {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((id) => id !== categoryId)
      );
    }
  };
  const selectedSomeCategories =
    selectedCategories.length > 0 && selectedCategories.length < categories.length;
  const selectedAllCategories = selectedCategories.length === categories.length;
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
      categories.push(newProduct);
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
            Category details
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
                  checked={selectedAllCategories}
                  indeterminate={selectedSomeCategories}
                  onChange={handleSelectAllCategories}
                />
              </TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>
                Category ID
              </TableCell>
              <TableCell align="right">
                Quantity
              </TableCell>
              <TableCell align="right">
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {categories.map((category) => {
              const isCategorySelected = selectedCategories.includes(
                category._id
              );
              return (
                <TableRow
                  hover
                  key={category._id}
                  selected={isCategorySelected}
                  onClick={() => handleClickOpen(category._id)}
                >
                  <TableCell padding="checkbox" sx={{paddingLeft: 1.6}}>
                    <Checkbox
                      color="primary"
                      checked={isCategorySelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCategory(event, category._id)
                      }
                      value={isCategorySelected}
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
                      {category.categoryName}
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
                      {category._id}
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
                      {category.productQuantity}
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
                      {category.totalAmount}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <EditCategoryDialog open={open} handleClose={handleClose} value={value}/>
    </Card>
  );
};

RecentCategoriesTable.propTypes = {
  categories: PropTypes.array.isRequired
};

RecentCategoriesTable.defaultProps = {
  categories: []
};

export default RecentCategoriesTable;
