import db from '../database';
import { IUser } from '../interfaces/user.interface';
import { hashingPassword } from '../utils/passwordHashing';
import bcrypt from 'bcrypt';
import config from '../config';

export class UserModel {
  // get all users
  async index(): Promise<
    IUser[]
  > {
    try {
      const conn =
        await db.connect();
      const sql =
        'SELECT id, email, first_name, last_name FROM users';
      const result =
        await conn.query(
          sql
        );
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `ERROR: Cannot get all users ${error}`
      );
    }
  }

  // create new user
  async create(
    user: IUser
  ): Promise<IUser> {
    try {
      const conn =
        await db.connect();
      const sql =
        'INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name';
      const result =
        await conn.query(
          sql,
          [
            user.email,
            user.first_name,
            user.last_name,
            hashingPassword(
              user.password
            ),
          ]
        );
      conn.release();
      return result
        .rows[0];
    } catch (error) {
      throw new Error(
        `ERROR: Cannot add new user ${error}`
      );
    }
  }

  // get specific user
  async show(
    id: string
  ): Promise<IUser> {
    try {
      const conn =
        await db.connect();
      const sql =
        'SELECT id, email, first_name, last_name FROM users WHERE id=($1)';
      const result =
        await conn.query(
          sql,
          [id]
        );
      conn.release();
      return result
        .rows[0];
    } catch (error) {
      throw new Error(
        `ERROR: Cannot get specific user ${error}`
      );
    }
  }

  // update user
  async edit(
    user: IUser
  ): Promise<IUser> {
    try {
      const conn =
        await db.connect();
      const sql =
        'UPDATE users SET email=($2) , first_name=($3) , last_name=($4) , password=($5) WHERE id=($1) RETURNING id, email, first_name, last_name';
      const result =
        await conn.query(
          sql,
          [
            user.id,
            user.email,
            user.first_name,
            user.last_name,
            hashingPassword(
              user.password
            ),
          ]
        );
      conn.release();
      return result
        .rows[0];
    } catch (error) {
      throw new Error(
        `ERROR: Cannot edit user ${error}`
      );
    }
  }

  // delete uesr
  async delete(
    id: string
  ): Promise<IUser> {
    try {
      const conn =
        await db.connect();
      const sql =
        'DELETE FROM users WHERE id=($1) RETURNING id, email, first_name, last_name';
      const result =
        await conn.query(
          sql,
          [id]
        );
      conn.release();
      return result
        .rows[0];
    } catch (error) {
      throw new Error(
        `ERROR: Cannot delete user ${error}`
      );
    }
  }

  // user authentication
  async login(
    emailEntered: string,
    passwordEntered: string
  ): Promise<IUser | null> {
    try {
      const conn =
        await db.connect();
      const sql =
        'SELECT password FROM users WHERE email=($1)';
      const result =
        await conn.query(
          sql,
          [
            emailEntered,
          ]
        );
      const pepper =
        config.pepper;
      if (
        result.rows !==
        null
      ) {
        const userInDB =
          result
            .rows[0];
        const isPasswordIdentical =
          bcrypt.compareSync(
            `${passwordEntered}${pepper}`,
            userInDB.password
          );
        if (
          isPasswordIdentical
        ) {
          const sql =
            'SELECT id, email, first_name, last_name FROM users WHERE email=($1)';
          const user =
            await conn.query(
              sql,
              [
                emailEntered,
              ]
            );
          conn.release();
          return user
            .rows[0];
        } else {
          conn.release();
          return null;
        }
      } else {
        conn.release();
        return null;
      }
    } catch (error) {
      throw new Error(
        `ERROR: Cannot login ${error}`
      );
    }
  }
}
