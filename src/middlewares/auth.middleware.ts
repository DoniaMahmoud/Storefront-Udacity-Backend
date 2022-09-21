import {
  Response,
  Request,
  NextFunction,
} from 'express';
import config from '../config';
import jwt from 'jsonwebtoken';

export const authMiddleware =
  (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    try {
      //user will send token in header
      // get auth header
      const auth =
        req.get(
          'authorization'
        );
      // if auth header exists => validate
      if (auth) {
        //check if token value type is bearer
        const bearer =
          auth?.split(
            ' '
          )[0];
        const token =
          auth?.split(
            ' '
          )[1];
        //if bearer =>
        if (
          bearer ===
            'Bearer' &&
          token
        ) {
          //if token is verified based on secretToken
          const verifiedToken =
            jwt.verify(
              token,
              config.secretToken as unknown as string
            );
          if (
            verifiedToken
          ) {
            next();
          } else {
            throw new Error(
              `ERROR: User authentication failed`
            );
          }
          //if not verified => failed to auth user
        } else {
          throw new Error(
            `ERROR: User authentication failed`
          );
        }
      }
      // if no auth header exists => no token provided
      else {
        throw new Error(
          `ERROR: no token provided`
        );
      }
    } catch (error) {
      throw new Error(
        `ERROR: Invalid user token ${error}`
      );
    }
  };
