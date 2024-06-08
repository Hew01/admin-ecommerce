import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import React, { useState } from 'react';

export default function AddCategoryDialog({ open, handleClose }) {
  const [title, setTitle] = useState('');
  const [parent, setParent] = useState('');
  const [status, setStatus] = useState('');

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle variant='h4' id="form-dialog-title">Add Category</DialogTitle>
      <DialogContent>
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
        <Box mt={2}>
          <TextField
            id="outlined-select-currency"
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value={10}>Active</MenuItem>
            <MenuItem value={20}>Inactive</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
