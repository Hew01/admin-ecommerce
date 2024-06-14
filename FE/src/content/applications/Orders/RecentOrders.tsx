import { Box, Card, CircularProgress } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { useEffect, useState } from 'react';
import apiFetch from 'src/utils/apiConfig';
import axios from 'axios';
import { Order } from 'src/models/order';

function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add this line

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Add this line
        const response = await apiFetch('orders/all', '');
        setOrders(response);
        setIsLoading(false); // Add this line
        console.log(response);
      } catch (error) {
        setIsLoading(false); // Add this line
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);
  return (
    <Card>
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
        <RecentOrdersTable orders={orders} />
      )}
    </Card>
  );
}

export default RecentOrders;
