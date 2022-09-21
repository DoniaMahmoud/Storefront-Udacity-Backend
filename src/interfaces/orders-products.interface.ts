import { IProduct } from './product.interface';

export interface IOrderProduct {
  id?: string;
  quantity: string;
  orderID: string;
  productID: string;
  products?: IProduct[];
}
