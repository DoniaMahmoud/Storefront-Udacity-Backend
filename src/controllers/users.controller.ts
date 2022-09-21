import {
  Response,
  Request,
  NextFunction,
} from 'express';
import { UserModel } from '../models/user.model';
import config from '../config';
import jwt from 'jsonwebtoken';
const uModel =
  new UserModel();

export const index =
  async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // maake middleware for validation before going to model
      const users =
        await uModel.index();
      res.send({
        users:
          users,
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
      const createdUser =
        await uModel.create(
          req.body
        );
      res.send({
        message:
          'User is created successfully',
        user: createdUser,
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
      const user =
        await uModel.show(
          req.params
            .id
        );
      res.send({
        user: user,
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
      const user =
        await uModel.edit(
          req.body
        );
      res.send({
        message:
          'User is updated successfully',
        updatedUser:
          user,
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
      const user =
        await uModel.delete(
          req.params
            .id
        );
      res.send({
        message:
          'User is deleted successfully',
        deletedUser:
          user,
      });
    } catch (err) {
      next(err);
    }
  };
export const login =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // maake middleware for validation before going to model
      const user =
        await uModel.login(
          req.body
            .email,
          req.body
            .password
        );
      const token =
        jwt.sign(
          { user },
          config.secretToken as unknown as string
        );
      if (user) {
        res.send({
          loggedUser:
            user,
          token:
            token,
        });
      } else {
        res.send({
          message:
            'User not found',
        });
      }
    } catch (err) {
      next(err);
    }
  };
