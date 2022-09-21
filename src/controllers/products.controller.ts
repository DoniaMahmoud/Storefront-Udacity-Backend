import {
  Response,
  Request,
  NextFunction,
} from 'express';
import { ProductModel } from '../models/product.model';

const pModel =
  new ProductModel();

export const index =
  async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // maake middleware for validation before going to model
      const products =
        await pModel.index();
      res.send({
        products:
          products,
      });
    } catch (err) {
      next(err);
    }
  };

export const create =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // maake middleware for validation before going to model
      const createdProduct =
        await pModel.create(
          req.body
        );
      res.send({
        message:
          'Product is created successfully',
        product:
          createdProduct,
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
      const product =
        await pModel.show(
          req.params
            .id
        );
      res.send({
        product:
          product,
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
      const product =
        await pModel.edit(
          req.body
        );
      res.send({
        message:
          'Product is updated successfully',
        updatedProduct:
          product,
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
      const product =
        await pModel.delete(
          req.params
            .id
        );
      res.send({
        message:
          'Product is deleted successfully',
        deletedProduct:
          product,
      });
    } catch (err) {
      next(err);
    }
  };
