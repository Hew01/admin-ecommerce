import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import apiFetch from 'src/utils/apiConfig';

export default function EditCategoryDialog({ open, handleClose, value }) {
  const [category, setCategory] = useState<any>(null);
  const [title, setTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (open)
      try {
        setIsLoading(true); // Add this line
        const response = await apiFetch('categories/' + value, '');
        setIsLoading(false); // Add this line
        setCategory(response);
        setTitle(response.categoryName);
        console.log(response);
      } catch (error) {
        setIsLoading(false); // Add this line
        console.error('Error fetching data', error);
      }
    };
    
    fetchData();
  }, [open]);

  const updateCategory = async () => {
    try {
      const response = await apiFetch('categories/update/' + value, {
        categoryName: title,
        productQuantity: category.productQuantity
      });
      if (response.operationSuccess === true)
        toast.success('Product updated successfully');
      else console.log('no?') // Display success toast
    } catch (error) {
      console.error('Error updating data', error);
      toast.error('Error updating product'); // Display error toast
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle variant='h4' id="form-dialog-title">Edit Category</DialogTitle>
      <DialogContent>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <CircularProgress />
        </Box>
      ) : (

        <Box mt={2}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Category Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>

      )}
            </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {
          updateCategory();
          handleClose();
        }} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
