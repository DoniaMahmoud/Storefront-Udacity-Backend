import express, {
  Request,
  Response,
} from 'express';
import {
  create,
  index,
  show,
  edit,
  deletee,
} from '../../controllers/orders-products.controller';

const routes =
  express.Router();

routes.get(
  '/',
  (
    _req: Request,
    res: Response
  ): void => {
    res.send(
      'orders-products route'
    );
  }
);

//middlewares and controllers
// create orders-products
routes.post(
  '/createOP',
  create
);

// get all orders-products
routes.get(
  '/getOPs/:id',
  index
);

// get specific orders-products
routes.get(
  '/getOP/:id',
  show
);

// update orders-products
routes.post(
  '/update',
  edit
);

// delete orders-products
routes.delete(
  '/delete',
  deletee
);

export default routes;
