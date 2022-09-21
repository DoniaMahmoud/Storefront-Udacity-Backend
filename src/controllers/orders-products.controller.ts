import {
  Response,
  Request,
  NextFunction,
} from 'express';
import { OrdersProductsModel } from '../models/orders-products.model';

const opModel =
  new OrdersProductsModel();

// get all products in order with given id
export const index =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // maake middleware for validation before going to model
      const orderProducts =
        await opModel.index(
          req.params
            .id
        );
      res.send({
        orderProducts:
          orderProducts,
      });
    } catch (err) {
      next(err);
    }
  };
// create new order product
export const create =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // maake middleware for validation before going to model
      const createdOrderProduct =
        await opModel.create(
          req.body
        );
      res.send({
        message:
          'Order Product is created successfully',
        orderProduct:
          createdOrderProduct,
      });
    } catch (err) {
      next(err);
    }
  };

export const show =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // maake middleware for validation before going to model
      const orderProduct =
        await opModel.show(
          req.params
            .id
        );
      res.send({
        orderProduct:
          orderProduct,
      });
    } catch (err) {
      next(err);
    }
  };

export const edit =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // maake middleware for validation before going to model

      const orderProduct =
        await opModel.edit(
          req.body
        );
      res.send({
        message:
          'Order Product is updated successfully',
        updatedOrderProduct:
          orderProduct,
      });
    } catch (err) {
      next(err);
    }
  };

export const deletee =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // maake middleware for validation before going to model
      const orderProduct =
        await opModel.delete(
          req.body
        );
      res.send({
        message:
          'Order Product is deleted successfully',
        deletedOrderProduct:
          orderProduct,
      });
    } catch (err) {
      next(err);
    }
  };
