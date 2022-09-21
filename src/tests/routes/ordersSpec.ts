import supertest from 'supertest';
import app from '../../index';
import { IOrder } from '../../interfaces/order.interface';
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
      'user@gmail.com',
    first_name:
      'donia',
    last_name:
      'mahmoud',
    password:
      'password',
  };
const order: IOrder =
  {
    status:
      'active',
    userID:
      user.id as string,
  };

describe(' Testing orders Endpoints', () => {
  beforeAll(
    async () => {
      const createdUser =
        await uModel.create(
          user
        );
      user.id =
        createdUser.id;
      order.userID =
        createdUser.id as string;
    }
  );

  describe('User Login and Authetication Endpoint ', () => {
    it('should login to get authentication Token ', async () => {
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

  describe('orders CRUD Endpoints', () => {
    //create
    it('should create order and return it ', async () => {
      const res =
        await req
          .post(
            '/api/orders/create'
          )
          .set(
            'Content-Type',
            'application/json'
          ).set(
            'Authorization',
            `Bearer ${authenticationToken}`
          )
          .send(
            order
          );

      const {
        id,
        status,
        userid,
      } =
        res.body
          .order;
      expect(
        status
      ).toBe(
        order.status
      );
      expect(
        userid
      ).toBe(
        order.userID
      );
      order.id = id;
    });
    //get all orders
    it('should get all orders ', async () => {
      const res =
        await req
          .get(
            '/api/orders/getOrders'
          )
          .set(
            'Content-Type',
            'application/json'
          ).set(
            'Authorization',
            `Bearer ${authenticationToken}`
          );
      expect(
        res.body
          .orders
          .length
      ).toBe(1);
    });

    it('should get a specific order given id ', async () => {
      const res =
        await req
          .get(
            `/api/orders/getOrder/${order.id}`
          )
          .set(
            'Content-Type',
            'application/json'
          ).set(
            'Authorization',
            `Bearer ${authenticationToken}`
          );

      const {
        id,
        status,
        userid,
      } =
        res.body
          .order;
      expect(
        id
      ).toBe(
        order.id
      );
      expect(
        status
      ).toBe(
        order.status
      );
      expect(
        userid
      ).toBe(
        order.userID
      );
    });

    it('should update a specific order ', async () => {
      const res =
        await req
          .patch(
            '/api/orders/update'
          )
          .set(
            'Content-Type',
            'application/json'
          ).set(
            'Authorization',
            `Bearer ${authenticationToken}`
          )
          .send({
            id: order.id,
            status:
              'complete',
            userID:
              order.userID,
          });
      const {
        status,
      } =
        res.body
          .updatedOrder;
      expect(
        status
      ).toBe(
        'complete'
      );
    });
    it('should get order by user id', async () => {
      const res =
        await req
          .get(
            `/api/orders/getOrderbyUser/${user.id}`
          )
          .set(
            'Content-Type',
            'application/json'
          )
          .set(
            'Authorization',
            `Bearer ${authenticationToken}`
          );

      const {
        id,
        status,
        userid,
      } =
        res.body
          .order;
      expect(
        id
      ).toBe(
        order.id
      );
      expect(
        status
      ).toBe(
        'complete'
      );
      expect(
        userid
      ).toBe(
        order.userID
      );
    });

    it('should delete a specific order and return it', async () => {
      const res =
        await req
          .delete(
            `/api/orders/delete/${order.id}`
          )
          .set(
            'Content-Type',
            'application/json'
          ).set(
            'Authorization',
            `Bearer ${authenticationToken}`
          );

      const {
        id,
        status,
        userid,
      } =
        res.body
          .deletedOrder;
      expect(
        id
      ).toBe(
        order.id
      );
      expect(
        status
      ).toBe(
        'complete'
      );
      expect(
        userid
      ).toBe(
        order.userID
      );
    });

    afterAll(
      async () => {
        const conn =
          await db.connect();
        const sql1 =
          'DELETE FROM users';
        const sql2 =
          'DELETE FROM orders';
        // const sql3= 'DELETE FROM products';
        // const sql4= 'DELETE FROM orders_products';
        await conn.query(
          sql2
        );
        await conn.query(
          sql1
        );

        conn.release();
      }
    );
  });
});
