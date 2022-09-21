import supertest from 'supertest';
import app from '../../index';
import { IOrderProduct } from '../../interfaces/orders-products.interface';
import { OrderModel } from '../../models/order.model';
import { IOrder } from '../../interfaces/order.interface';
import { ProductModel } from '../../models/product.model';
import { IProduct } from '../../interfaces/product.interface';
import { UserModel } from '../../models/user.model';
import { IUser } from '../../interfaces/user.interface';
import db from '../../database';

// create a request object
const req =
  supertest(app);
const oModel =
  new OrderModel();
const pModel =
  new ProductModel();
const uModel =
  new UserModel();

const user: IUser =
  {
    email:
      'doniam@gmail.com',
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
const product: IProduct =
  {
    name: 'ps5',
    category:
      'gaming',
    price: 10000,
  };
const orderProduct: IOrderProduct =
  {
    quantity:
      20 as unknown as string,
    orderID:
      order.id as string,
    productID:
      product.id as string,
  };

describe(' Testing orders-products Endpoints', () => {
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
      const createdProduct =
        await pModel.create(
          product
        );
      const createdOrder =
        await oModel.create(
          order
        );
      order.id =
        createdOrder.id as string;
      product.id =
        createdProduct.id as string;
      orderProduct.orderID =
        order.id as string;
      orderProduct.productID =
        product.id as string;
    }
  );

  describe('orders-products CRUD Endpoints', () => {
    //create
    it('should create order product and return it ', async () => {
      const res =
        await req
          .post(
            '/api/orderProducts/createOP'
          )
          .set(
            'Content-Type',
            'application/json'
          )
          .send(
            orderProduct
          );

      const {
        id,
        quantity,
        orderid,
        productid,
      } =
        res.body
          .orderProduct;
      expect(
        quantity
      ).toBe(20);
      expect(
        orderid
      ).toBe(
        order.id
      );
      expect(
        productid
      ).toBe(
        product.id
      );
      orderProduct.id =
        id;
    });
    //get all order products
    it('should get all order products ', async () => {
      const res =
        await req
          .get(
            `/api/orderProducts/getOPs/${order.id}`
          )
          .set(
            'Content-Type',
            'application/json'
          );
      expect(
        res.body
          .orderProducts
          .length
      ).toBe(1);
    });

    it('should get a specific order product given id ', async () => {
      const res =
        await req
          .get(
            `/api/orderProducts/getOP/${orderProduct.id}`
          )
          .set(
            'Content-Type',
            'application/json'
          );

      const {
        quantity,
        orderid,
        productid,
      } =
        res.body
          .orderProduct;
      expect(
        quantity
      ).toBe(20);
      expect(
        orderid
      ).toBe(
        order.id
      );
      expect(
        productid
      ).toBe(
        product.id
      );
    });

    it('should update a specific user given user id ', async () => {
      const res =
        await req
          .post(
            '/api/orderProducts/update'
          )
          .set(
            'Content-Type',
            'application/json'
          )
          .send({
            quantity: 100,
            orderID:
              orderProduct.orderID,
            productID:
              orderProduct.productID,
          });
      const {
        quantity,
      } =
        res.body
          .updatedOrderProduct;
      expect(
        quantity
      ).toBe(100);
    });

    it('should delete a specific order product and return the deleted user', async () => {
      const res =
        await req
          .delete(
            `/api/orderProducts/delete`
          )
          .set(
            'Content-Type',
            'application/json'
          )
          .send({
            orderID:
              orderProduct.orderID,
            productID:
              orderProduct.productID,
          });

      const {
        id,
        quantity,
        orderid,
        productid,
      } =
        res.body
          .deletedOrderProduct;
      expect(
        orderProduct.id
      ).toBe(id);
      expect(
        quantity
      ).toBe(100);
      expect(
        orderProduct.orderID
      ).toBe(
        orderid
      );
      expect(
        orderProduct.productID
      ).toBe(
        productid
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
        const sql3 =
          'DELETE FROM products';
        const sql4 =
          'DELETE FROM orders_products';
        await conn.query(
          sql4
        );
        await conn.query(
          sql2
        );
        await conn.query(
          sql3
        );
        await conn.query(
          sql1
        );
        conn.release();
      }
    );
  });
});
