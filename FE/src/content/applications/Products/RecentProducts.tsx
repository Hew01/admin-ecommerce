import { Box, Card, CircularProgress } from '@mui/material';
import { Product } from 'src/models/product';
import RecentProductsTable from './RecentProductsTable';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import apiFetch from 'src/utils/apiConfig';
import axios from 'axios';

function RecentProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add this line

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Add this line
        const response = await apiFetch('products/all', '');

        setProducts(response);
        setIsLoading(false); // Add this line
        console.log(response);
      } catch (error) {
        setIsLoading(false); // Add this line
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);
  // const cryptoProducts: Product[] = [
  //   {
  //     id: '1',
  //     productDetails: 'Fiat Deposit',
  //     productDate: new Date().getTime(),
  //     status: 'completed',
  //     productID: 'VUVX709ET7BY',
  //     sourceName: 'Bank Account',
  //     sourceDesc: '*** 1111',
  //     amountCrypto: 34.4565,
  //     amount: 56787,
  //     cryptoCurrency: 'ETH',
  //     currency: '$'
  //   },
  //   {
  //     id: '2',
  //     productDetails: 'Fiat Deposit',
  //     productDate: subDays(new Date(), 1).getTime(),
  //     status: 'completed',
  //     productID: '23M3UOG65G8K',
  //     sourceName: 'Bank Account',
  //     sourceDesc: '*** 1111',
  //     amountCrypto: 6.58454334,
  //     amount: 8734587,
  //     cryptoCurrency: 'BTC',
  //     currency: '$'
  //   },
  //   {
  //     id: '3',
  //     productDetails: 'Fiat Deposit',
  //     productDate: subDays(new Date(), 5).getTime(),
  //     status: 'failed',
  //     productID: 'F6JHK65MS818',
  //     sourceName: 'Bank Account',
  //     sourceDesc: '*** 1111',
  //     amountCrypto: 6.58454334,
  //     amount: 8734587,
  //     cryptoCurrency: 'BTC',
  //     currency: '$'
  //   },
  //   {
  //     id: '4',
  //     productDetails: 'Fiat Deposit',
  //     productDate: subDays(new Date(), 55).getTime(),
  //     status: 'completed',
  //     productID: 'QJFAI7N84LGM',
  //     sourceName: 'Bank Account',
  //     sourceDesc: '*** 1111',
  //     amountCrypto: 6.58454334,
  //     amount: 8734587,
  //     cryptoCurrency: 'BTC',
  //     currency: '$'
  //   },
  //   {
  //     id: '5',
  //     productDetails: 'Fiat Deposit',
  //     productDate: subDays(new Date(), 56).getTime(),
  //     status: 'pending',
  //     productID: 'BO5KFSYGC0YW',
  //     sourceName: 'Bank Account',
  //     sourceDesc: '*** 1111',
  //     amountCrypto: 6.58454334,
  //     amount: 8734587,
  //     cryptoCurrency: 'BTC',
  //     currency: '$'
  //   },
  //   {
  //     id: '6',
  //     productDetails: 'Fiat Deposit',
  //     productDate: subDays(new Date(), 33).getTime(),
  //     status: 'completed',
  //     productID: '6RS606CBMKVQ',
  //     sourceName: 'Bank Account',
  //     sourceDesc: '*** 1111',
  //     amountCrypto: 6.58454334,
  //     amount: 8734587,
  //     cryptoCurrency: 'BTC',
  //     currency: '$'
  //   },
  //   {
  //     id: '7',
  //     productDetails: 'Fiat Deposit',
  //     productDate: new Date().getTime(),
  //     status: 'pending',
  //     productID: '479KUYHOBMJS',
  //     sourceName: 'Bank Account',
  //     sourceDesc: '*** 1212',
  //     amountCrypto: 2.346546,
  //     amount: 234234,
  //     cryptoCurrency: 'BTC',
  //     currency: '$'
  //   },
  //   {
  //     id: '8',
  //     productDetails: 'Paypal Withdraw',
  //     productDate: subDays(new Date(), 22).getTime(),
  //     status: 'completed',
  //     productID: 'W67CFZNT71KR',
  //     sourceName: 'Paypal Account',
  //     sourceDesc: '*** 1111',
  //     amountCrypto: 3.345456,
  //     amount: 34544,
  //     cryptoCurrency: 'BTC',
  //     currency: '$'
  //   },
  //   {
  //     id: '9',
  //     productDetails: 'Fiat Deposit',
  //     productDate: subDays(new Date(), 11).getTime(),
  //     status: 'completed',
  //     productID: '63GJ5DJFKS4H',
  //     sourceName: 'Bank Account',
  //     sourceDesc: '*** 2222',
  //     amountCrypto: 1.4389567945,
  //     amount: 123843,
  //     cryptoCurrency: 'BTC',
  //     currency: '$'
  //   },
  //   {
  //     id: '10',
  //     productDetails: 'Wallet Transfer',
  //     productDate: subDays(new Date(), 123).getTime(),
  //     status: 'failed',
  //     productID: '17KRZHY8T05M',
  //     sourceName: 'Wallet Transfer',
  //     sourceDesc: "John's Cardano Wallet",
  //     amountCrypto: 765.5695,
  //     amount: 7567,
  //     cryptoCurrency: 'ADA',
  //     currency: '$'
  //   }
  // ];

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
        <RecentProductsTable products={products} />
      )}
    </Card>
  );
}

export default RecentProducts;
