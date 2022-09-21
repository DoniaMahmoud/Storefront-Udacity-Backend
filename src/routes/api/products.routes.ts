import express, {
  Request,
  Response,
} from 'express';
import {
  index,
  create,
  show,
  edit,
  deletee,
} from '../../controllers/products.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const routes =
  express.Router();

routes.get(
  '/',
  (
    _req: Request,
    res: Response
  ): void => {
    res.send(
      'products route'
    );
  }
);

//middlewares and controllers
// create product
routes.post(
  '/create',
  authMiddleware,
  create
);

// get all products
routes.get(
  '/getProducts',
  index
);

// get specific product
routes.get(
  '/getProduct/:id',
  show
);

// update product
routes.patch(
  '/update',
  edit
);

// delete product
routes.delete(
  '/delete/:id',
  deletee
);

export default routes;
