export type OrderStatus = 'completed' | 'pending' | 'failed';

export interface Order {
  id: string;
  status: OrderStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}
