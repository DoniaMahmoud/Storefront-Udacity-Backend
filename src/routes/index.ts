import express, {
  Response,
  Request,
  Router,
} from 'express';

import userRoutes from './api/users.routes';
import orderRoutes from './api/orders.routes';
import productRoutes from './api/products.routes';
import ordersProductsRoutes from './api/orders-products.routes';

const routes: Router =
  express.Router();

routes.get(
  '/',
  (
    _req: Request,
    res: Response
  ): void => {
    res.send(
      'main api route'
    );
  }
);

routes.use(
  '/users',
  userRoutes
);
routes.use(
  '/orders',
  orderRoutes
);
routes.use(
  '/products',
  productRoutes
);
routes.use(
  '/orderProducts',
  ordersProductsRoutes
);

export default routes;
