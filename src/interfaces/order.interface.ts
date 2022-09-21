import { IOrderProduct } from './orders-products.interface';

export interface IOrder {
  id?: string;
  status:
    | 'active'
    | 'complete';
  userID: string;
  products?: IOrderProduct[];
}
