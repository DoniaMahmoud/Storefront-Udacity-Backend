import supertest from 'supertest';
import app from '../../index';
import { UserModel } from '../../models/user.model';
import { IUser } from '../../interfaces/user.interface';
import db from '../../database';

// create a request object
const req =
  supertest(app);
const uModel =
  new UserModel();
let authenticationToken =
  '';
const user: IUser =
  {
    email:
      'donia@gmail.com',
    first_name:
      'donia',
    last_name:
      'mahmoud',
    password:
      'password',
  };
describe('Testing Endpoints', () => {
  beforeAll(
    async () => {
      const createdUser =
        await uModel.create(
          user
        );
      user.id =
        createdUser.id;
    }
  );
  describe('User Login and Authetication Endpoint ', () => {
    it('should login to get authenticationToken ', async () => {
      const res =
        await req
          .post(
            '/api/users/login'
          )
          .set(
            'Content-Type',
            'application/json'
          )
          .send({
            email:
              user.email,
            password:
              user.password,
          });
      const {
        id,
        email,
        first_name,
        last_name,
      } =
        res.body
          .loggedUser;
      const token =
        res.body
          .token;
      expect(
        id
      ).toBe(
        user.id
      );
      expect(
        email
      ).toBe(
        user.email
      );
      expect(
        first_name
      ).toBe(
        user.first_name
      );
      expect(
        last_name
      ).toBe(
        user.last_name
      );
      authenticationToken =
        token;
    });
  });
  describe('User CRUD Endpoints', () => {
    it('should create a new user ', async () => {
      const res =
        await req
          .post(
            '/api/users/create'
          )
          .set(
            'Authorization',
            `Bearer ${authenticationToken}`
          )
          .set(
            'Content-Type',
            'application/json'
          )
          .send({
            email:
              'test1@gmail.com',
            first_name:
              'test1',
            last_name:
              'test1',
            password:
              'password',
          });
      const {
        email,
        first_name,
        last_name,
      } =
        res.body
          .user;
      expect(
        email
      ).toBe(
        'test1@gmail.com'
      );
      expect(
        first_name
      ).toBe(
        'test1'
      );
      expect(
        last_name
      ).toBe(
        'test1'
      );
    });

    it('should get all users ', async () => {
      const res =
        await req
          .get(
            '/api/users/getUsers'
          )
          .set(
            'Authorization',
            `Bearer ${authenticationToken}`
          )
          .set(
            'Content-Type',
            'application/json'
          );
      expect(
        res.body
          .users
          .length
      ).toBe(2);
    });

    it('should get a specific user given user id ', async () => {
      const res =
        await req
          .get(
            `/api/users/getUser/${user.id}`
          )
          .set(
            'Authorization',
            `Bearer ${authenticationToken}`
          )
          .set(
            'Content-Type',
            'application/json'
          );

      const {
        email,
        first_name,
        last_name,
      } =
        res.body
          .user;
      expect(
        email
      ).toBe(
        'donia@gmail.com'
      );
      expect(
        first_name
      ).toBe(
        'donia'
      );
      expect(
        last_name
      ).toBe(
        'mahmoud'
      );
    });

    it('should update a specific user given user id ', async () => {
      const res =
        await req
          .patch(
            '/api/users/update'
          )
          .set(
            'Authorization',
            `Bearer ${authenticationToken}`
          )
          .set(
            'Content-Type',
            'application/json'
          )
          .send({
            id: user.id,
            email:
              'test2@gmail.com',
            first_name:
              'test2',
            last_name:
              'test2',
            password:
              'password',
          });
      const {
        email,
        first_name,
        last_name,
      } =
        res.body
          .updatedUser;
      expect(
        email
      ).toBe(
        'test2@gmail.com'
      );
      expect(
        first_name
      ).toBe(
        'test2'
      );
      expect(
        last_name
      ).toBe(
        'test2'
      );
    });

    it('should delete a specific user given user id ', async () => {
      const res =
        await req
          .delete(
            `/api/users/delete/${user.id}`
          )
          .set(
            'Authorization',
            `Bearer ${authenticationToken}`
          )
          .set(
            'Content-Type',
            'application/json'
          );

      const {
        email,
        first_name,
        last_name,
      } =
        res.body
          .deletedUser;
      expect(
        email
      ).toBe(
        'test2@gmail.com'
      );
      expect(
        first_name
      ).toBe(
        'test2'
      );
      expect(
        last_name
      ).toBe(
        'test2'
      );
    });
  });
  afterAll(
    async () => {
      const conn =
        await db.connect();
      const sql =
        'DELETE FROM users';
      await conn.query(
        sql
      );
      conn.release();
    }
  );
});
