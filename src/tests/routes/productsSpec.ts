import supertest from 'supertest';
import app from '../../index';
import { IProduct } from '../../interfaces/product.interface';
import { UserModel } from '../../models/user.model';
import { IUser } from '../../interfaces/user.interface';
import db from '../../database';

// create a request object
const req =
  supertest(app);

const uModel =
  new UserModel();
// const pModel = new UserModel();

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
const product: IProduct =
  {
    name: 'ps5',
    category:
      'gaming',
    price: 10000,
  };

describe(' Testing products Endpoints', () => {
  beforeAll(
    async () => {
      const createdUser =
        await uModel.create(
          user
        );
      user.id =
        createdUser.id;

      // order.userID =createdUser.id as string
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

  describe('products CRUD Endpoints', () => {
    //create
    it('should create product and return it ', async () => {
      const res =
        await req
          .post(
            '/api/products/create'
          )
          .set(
            'Content-Type',
            'application/json'
          )
          .set(
            'Authorization',
            `Bearer ${authenticationToken}`
          )
          .send(
            product
          );

      const {
        id,
        name,
        category,
        price,
      } =
        res.body
          .product;
      expect(
        name
      ).toBe(
        product.name
      );
      expect(
        category
      ).toBe(
        product.category
      );
      expect(
        parseInt(
          price
        )
      ).toBe(
        product.price
      );
      product.id =
        id;
    });
    //get all products
    it('should get all products ', async () => {
      const res =
        await req
          .get(
            '/api/products/getProducts'
          )
          .set(
            'Content-Type',
            'application/json'
          );
      expect(
        res.body
          .products
          .length
      ).toBe(1);
    });

    it('should get a specific product given id ', async () => {
      const res =
        await req
          .get(
            `/api/products/getProduct/${product.id}`
          )
          .set(
            'Content-Type',
            'application/json'
          );

      const {
        id,
        name,
        category,
        price,
      } =
        res.body
          .product;
      expect(
        id
      ).toBe(
        product.id
      );
      expect(
        name
      ).toBe(
        product.name
      );
      expect(
        category
      ).toBe(
        product.category
      );
      expect(
        parseInt(
          price
        )
      ).toBe(
        product.price
      );
    });

    it('should update a specific product ', async () => {
      const res =
        await req
          .patch(
            '/api/products/update'
          )
          .set(
            'Content-Type',
            'application/json'
          )
          .send({
            id: product.id,
            name: 'ps4',
            category:
              product.category,
            price: 7000,
          });
      // const { status } = res.body.updatedProduct;
      // expect(status).toBe("complete");
      const {
        name,
        price,
      } =
        res.body
          .updatedProduct;
      expect(
        name
      ).toBe('ps4');
      expect(
        parseInt(
          price
        )
      ).toBe(7000);
    });

    it('should delete a specific product and return it', async () => {
      const res =
        await req
          .delete(
            `/api/products/delete/${product.id}`
          )
          .set(
            'Content-Type',
            'application/json'
          );

      const {
        id,
        name,
        category,
        price,
      } =
        res.body
          .deletedProduct;
      expect(
        id
      ).toBe(
        product.id
      );
      expect(
        name
      ).toBe('ps4');
      expect(
        category
      ).toBe(
        product.category
      );
      expect(
        parseInt(
          price
        )
      ).toBe(7000);
    });

    afterAll(
      async () => {
        const conn =
          await db.connect();
        const sql1 =
          'DELETE FROM users';
        // const sql2= 'DELETE FROM orders';
        const sql3 =
          'DELETE FROM products';
        // const sql4= 'DELETE FROM orders_products';
        await conn.query(
          sql3
        );
        // await conn.query(sql2);
        await conn.query(
          sql1
        );

        conn.release();
      }
    );
  });
});
