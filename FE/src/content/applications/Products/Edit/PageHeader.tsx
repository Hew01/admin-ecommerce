import {
  Typography,
  Button,
  Grid,
  Tooltip,
  IconButton,
  Box
} from '@mui/material';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { Save } from '@mui/icons-material';
import { useStore } from 'src/store/product';
import apiFetch from 'src/utils/apiConfig';
import { toast } from 'react-toastify';
import { NavLink as RouterLink } from 'react-router-dom';

function PageHeader({ productId }: { productId: string }) {
  const name = useStore((state) => state.name);
  const brand = useStore((state) => state.brand);
  const description = useStore((state) => state.description);
  const price = useStore((state) => state.price);
  const detailInfo = useStore((state) => state.detailInfo);
  const category = useStore((state) => state.category);
  const amount = useStore((state) => state.amount);
  const publishStatus = useStore((state) => state.publishStatus);
  const instock = useStore((state) => state.instock);
  const images = useStore((state) => state.images);

  const data = { // You need to provide a way to generate or fetch this
    productName: name,
    brand: brand,
    category: category,
    description: description,
    price: price,
    detailed_info: detailInfo, // Note the underscore to match your JSON layout
    images: images,
    instockStatus: instock, // Note the camelCase to match your JSON layout
    publishStatus: publishStatus,
    quantity: amount // You used 'amount' for quantity in your state
  };
  
  const handleUpdate = async () => {
    try {
      console.log(data);
      const response = await apiFetch('products/update/' + productId, data);
      if (response.operationSuccess === true)
        toast.success('Product updated successfully'); // Display success toast
    } catch (error) {
      console.error('Error updating data', error);
      toast.error('Error updating product'); // Display error toast
    }
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item display="flex">
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2, ml: -2 }}
           component={RouterLink} to="/management/products">
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box alignContent="center">
          <Typography variant="h3" component="h3" gutterBottom>
            Edit product
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          startIcon={<Save fontSize="small" />}
          onClick={handleUpdate}
        >
          Save product
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
