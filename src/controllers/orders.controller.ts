import {
  Response,
  Request,
  NextFunction,
} from 'express';

import { OrderModel } from '../models/order.model';

const oModel =
  new OrderModel();

export const index =
  async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // maake middleware for validation before going to model
      const orders =
        await oModel.index();
      res.send({
        orders:
          orders,
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
      const createdOrder =
        await oModel.create(
          req.body
        );
      res.send({
        message:
          'Order is created successfully',
        order:
          createdOrder,
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
      const order =
        await oModel.show(
          req.params
            .id
        );
      res.send({
        order:
          order,
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
      const order =
        await oModel.edit(
          req.body
        );
      res.send({
        message:
          'Order is updated successfully',
        updatedOrder:
          order,
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
      const order =
        await oModel.delete(
          req.params
            .id
        );
      res.send({
        message:
          'Order is deleted successfully',
        deletedOrder:
          order,
      });
    } catch (err) {
      next(err);
    }
  };

export const getOrderByUser =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // maake middleware for validation before going to model
      const order =
        await oModel.getOrderByUser(
          req.params
            .id
        );
      res.send({
        order:
          order,
      });
    } catch (err) {
      next(err);
    }
  };
// export const login = async (req:Request , res:Response, next: NextFunction)  => {
//       try{
//         // maake middleware for validation before going to model
//         const user = await oModel.login(req.body.email, req.body.password);
//         const token = jwt.sign({user},config.secretToken as unknown as string)
//         if(user){
//           res.send({
//             loggedUser: user,
//             token: token
//           })
//         }else{
//           res.send({
//             message: "User not found"
//           })
//         }

//       }
//       catch(err){
//         next(err)
//       }

// }
