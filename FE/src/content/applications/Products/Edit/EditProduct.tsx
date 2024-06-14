import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Product } from 'src/models/product';
import { useStore } from 'src/store/product';
import apiFetch from 'src/utils/apiConfig';

const status = [
  {
    value: 'inactive',
    label: 'Inactive'
  },
  {
    value: 'scheduled',
    label: 'Scheduled'
  },
  {
    value: 'published',
    label: 'Published'
  }
];

function EditProduct({ productId }: { productId: string }) {
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
  const setName = useStore((state) => state.setName);
  const setBrand = useStore((state) => state.setBrand);
  const setDescription = useStore((state) => state.setDescription);
  const setPrice = useStore((state) => state.setPrice);
  const setDetailInfo = useStore((state) => state.setDetailInfo);
  const setCategory = useStore((state) => state.setCategory);
  const setAmount = useStore((state) => state.setAmount);
  const setPublishStatus = useStore((state) => state.setPublishStatus);
  const setInstock = useStore((state) => state.setInstock);
  const setImages = useStore((state) => state.setImages);
  const [product, setProduct] = useState<Product>(null);
  const [categories, setCategories] = useState<any[]>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Add this line
        const response = await apiFetch('products/' + productId, '');
        setProduct(response);
        setName(response.productName);
        setBrand(response.brand);
        setDescription(response.description);
        setPrice(response.price);
        setDetailInfo(response.detailed_info);
        setCategory(response.category);
        setAmount(response.quantity);
        setPublishStatus(response.publishStatus);
        setInstock(response.instockStatus);
        setImages(response.images);
        console.log(response.images);
        setIsLoading(false); // Add this line
      } catch (error) {
        setIsLoading(false); // Add this line
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add this line
        const response = await apiFetch('categories/all', '');
        setCategories(response); // Add this line
      } catch (error) {
        // Add this line
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleRemoveClick = (indexToRemove: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleImageClick = (indexToReplace: number) => {
    const newImageUrl = window.prompt('Please enter the new image URL');
    if (newImageUrl) {
      setImages((prevImages) =>
        prevImages.map((image, index) =>
          index === indexToReplace ? newImageUrl : image
        )
      );
    }
  };
  const handleUploadClick = () => {
    const imageUrl = window.prompt('Please enter the image URL');
    if (imageUrl) {
      setImages((prevImages) => [...prevImages, imageUrl]);
    }
  };
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
            <Card sx={{ overflow: 'visible' }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h4" noWrap>
                  Product Information
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" noWrap>
                    NAME*
                  </Typography>
                  <TextField
                    required
                    value={name}
                    id="standard-required"
                    variant="standard"
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>
                <Box display="flex" flexDirection="row" sx={{ mt: 3 }} gap={6}>
                  <Box flexGrow={1}>
                    <Typography variant="subtitle1" noWrap>
                      BRAND
                    </Typography>
                    <TextField
                      required
                      id="standard-required"
                      value={brand}
                      variant="standard"
                      fullWidth
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </Box>
                  <Box flexGrow={1}>
                    <Typography variant="subtitle1" noWrap>
                      PRICE*
                    </Typography>
                    <TextField
                      required
                      id="standard-required"
                      variant="standard"
                      value={price}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        )
                      }}
                      fullWidth
                      onChange={(e) => setPrice(Number(e.target.value))}
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" noWrap>
                    DESCRIPTION
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      multiline
                      rows={4}
                      value={description}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" noWrap>
                    DETAIL INFO
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      multiline
                      rows={4}
                      value={detailInfo}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setDetailInfo(e.target.value)}
                    />
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card sx={{ overflow: 'visible' }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h4" noWrap>
                  Inventory
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" noWrap>
                    Category
                  </Typography>
                  <TextField
                    id="standard-select-currency"
                    select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    variant="standard"
                    fullWidth
                  >
                    {categories?.map((option) => (
                      <MenuItem
                        key={option.categoryName}
                        value={option.categoryName}
                      >
                        {option.categoryName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" noWrap>
                    Amount*
                  </Typography>
                  <TextField
                    id="standard"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    variant="standard"
                    fullWidth
                  ></TextField>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" noWrap>
                    Status
                  </Typography>
                  <TextField
                    id="standard-select-currency"
                    select
                    value={publishStatus}
                    onChange={(e) => setPublishStatus(e.target.value)}
                    variant="standard"
                    fullWidth
                  >
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  sx={{ mt: 3, mr: -1 }}
                >
                  <Typography variant="subtitle1" noWrap>
                    In stock
                  </Typography>
                  <Switch
                    checked={instock}
                    onChange={(e) => setInstock(e.target.checked)}
                  />
                </Box>
              </Box>
            </Card>
            <Card sx={{ overflow: 'visible', mt: 5 }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h4" noWrap>
                  Images
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    border: '1px dashed grey',
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {!images.length ? (
                    <>
                      <Typography variant="subtitle1">
                        Enter your image URL here
                      </Typography>
                      <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
                        or
                      </Typography>
                      <Button variant="contained" onClick={handleUploadClick}>
                        Enter Image URL
                      </Button>
                    </>
                  ) : (
                    <>
                      {images.map((image, index) => (
                        <div key={index} style={{ position: 'relative' }}>
                          <img
                            src={image}
                            alt={`preview ${index}`}
                            style={{
                              marginTop: '20px',
                              maxHeight: index === 0 ? '200px' : '100px',
                              width: 'auto'
                            }}
                            onClick={() => handleImageClick(index)}
                          />
                          <button
                            style={{ position: 'absolute', top: 0, right: 0 }}
                            onClick={() => handleRemoveClick(index)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                      <Button
                        variant="contained"
                        onClick={handleUploadClick}
                        sx={{ mt: 3 }}
                      >
                        Enter another image URL
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default EditProduct;
