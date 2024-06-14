import { Card } from '@mui/material';
import { Order } from 'src/models/order';
import { subDays } from 'date-fns';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  return (
    <Card>
      <RecentOrdersTable />
    </Card>
  );
}

export default RecentOrders;
