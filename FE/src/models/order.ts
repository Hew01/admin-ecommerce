export type OrderStatus = 'paid' | 'pending' | 'failed';

export interface Order {
  _id: {$oid: string};
  customerId: string;
  dateCreated: string;
  finalAmount: number;
  orderNote: string;
  orderSource: string;
  orderStatus: string;
  orderType: string;
  paymentMethod: {
    methodName: string;
    paymentDetail: string;
    transactionCode: number;
  }
  productList: {
    productId: string;
    quantity: number;
  } [];
  shipAddress: string;
  shippingStatus: string;
  totalAmount: number;  
}
