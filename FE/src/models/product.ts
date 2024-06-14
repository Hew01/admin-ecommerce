export type ProductStatus = 'completed' | 'pending' | 'failed';

export interface Product {
  _id: string;
  publishStatus: ProductStatus;
  productName: string;
  brand: string;
  descriptions: string;
  detailed_info:string
  category: string;
  instockStatus: boolean;
  description: string;
  images: string[];
  quantity: number;
  price: number;
}
