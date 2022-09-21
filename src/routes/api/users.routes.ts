import express from 'express';
import {
  create,
  index,
  show,
  edit,
  deletee,
  login,
} from '../../controllers/users.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
const routes =
  express.Router();

// routes.get('/', (_req:Request , res:Response) :void => {
//     res.send('users route');
//    });

//middlewares and controllers
// create a new user
routes.post(
  '/create',
  
  create
);

// get all users
routes.get(
  '/getUsers',
  authMiddleware,
  index
);

// get specific user
routes.get(
  '/getUser/:id',
  authMiddleware,
  show
);

// update user
routes.patch(
  '/update',
  authMiddleware,
  edit
);

// delete user
routes.delete(
  '/delete/:id',
  authMiddleware,
  deletee
);

// login user
routes.post(
  '/login',
  login
);

export default routes;
