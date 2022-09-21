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
  getOrderByUser,
} from '../../controllers/orders.controller';
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
      'orders route'
    );
  }
);

//middlewares and controllers
// create order
routes.post(
  '/create', authMiddleware,
  create
);

// get all orders
routes.get(
  '/getOrders',authMiddleware,
  index
);

// get specific order
routes.get(
  '/getOrder/:id',authMiddleware,
  show
);

// update order
routes.patch(
  '/update',authMiddleware,
  edit
);

// delete order
routes.delete(
  '/delete/:id',authMiddleware,
  deletee
);

// get order by user id
routes.get(
  '/getOrderbyUser/:id',
  authMiddleware,
  getOrderByUser
);

export default routes;
