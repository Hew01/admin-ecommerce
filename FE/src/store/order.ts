import {create} from 'zustand';

type Store = {
  customerId: string;
  setCustomerId: (value: string) => void;
  dateCreated: string;
  setDateCreated: (value: string) => void;
  finalAmount: number;
  setFinalAmount: (value: number) => void;
  orderNote: string;
  setOrderNote: (value: string) => void;
  orderSource: string;
  setOrderSource: (value: string) => void;
  orderStatus: string;
  setOrderStatus: (value: string) => void;
  orderType: string;
  setOrderType: (value: string) => void;
  paymentMethod: {
    methodName: string;
    paymentDetail: string;
    transactionCode: number;
  };
  setPaymentMethod: (value: {
    methodName: string;
    paymentDetail: string;
    transactionCode: number;
  }) => void;
  productList: {
    productId: string;
    quantity: number;
  }[];
  setProductList: (value: {
    productId: string;
    quantity: number;
  }[]) => void;
  shipAddress: string;
  setShipAddress: (value: string) => void;
  shippingStatus: string;
  setShippingStatus: (value: string) => void;
  totalAmount: number;
  setTotalAmount: (value: number) => void;
};

export const useStore = create<Store>((set) => ({
  customerId: '',
  setCustomerId: (value) => set(() => ({ customerId: value })),
  dateCreated: '',
  setDateCreated: (value) => set(() => ({ dateCreated: value })),
  finalAmount: 0,
  setFinalAmount: (value) => set(() => ({ finalAmount: value })),
  orderNote: '',
  setOrderNote: (value) => set(() => ({ orderNote: value })),
  orderSource: '',
  setOrderSource: (value) => set(() => ({ orderSource: value })),
  orderStatus: '',
  setOrderStatus: (value) => set(() => ({ orderStatus: value })),
  orderType: '',
  setOrderType: (value) => set(() => ({ orderType: value })),
  paymentMethod: {
    methodName: '',
    paymentDetail: '',
    transactionCode: 0,
  },
  setPaymentMethod: (value) =>
    set(() => ({ paymentMethod: value })),
  productList: [],
  setProductList: (value) => set(() => ({ productList: value })),
  shipAddress: '',
  setShipAddress: (value) => set(() => ({ shipAddress: value })),
  shippingStatus: '',
  setShippingStatus: (value) => set(() => ({ shippingStatus: value })),
  totalAmount: 0,
  setTotalAmount: (value) => set(() => ({ totalAmount: value })),
}));
