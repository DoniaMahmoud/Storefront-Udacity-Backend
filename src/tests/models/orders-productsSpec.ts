import { OrdersProductsModel } from '../../models/orders-products.model';
import { IOrderProduct } from '../../interfaces/orders-products.interface';
import { OrderModel } from '../../models/order.model';
import { IOrder } from '../../interfaces/order.interface';
import { ProductModel } from '../../models/product.model';
import { IProduct } from '../../interfaces/product.interface';
import { UserModel } from '../../models/user.model';
import { IUser } from '../../interfaces/user.interface';
import db from '../../database';

const opModel =
  new OrdersProductsModel();
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
      500 as unknown as string,
    orderID:
      order.id as string,
    productID:
      product.id as string,
  };

describe('Order Products CRUD Operations Suite', () => {
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
  // const testCreateOP : IOrderProduct ={

  //         quantity: 500 as unknown as string,
  //         orderID: order.id as string,
  //         productID: product.id as string

  // }
  //create
  it('should create order product and return it ', async () => {
    const createdOP =
      await opModel.create(
        orderProduct
      );
    orderProduct.id =
      createdOP.id;
    expect(
      createdOP
    ).toEqual({
      id: createdOP.id,
      quantity:
        500 as unknown as string,
      orderid:
        order.id,
      productid:
        product.id,
    } as unknown as IOrderProduct);
  });
  //index => get all order products
  it('should get all order products and ensure that there is one created', async () => {
    const getAllOPs =
      await opModel.index(
        order.id as string
      );
    const numOPs =
      getAllOPs.length;
    expect(
      numOPs
    ).toEqual(1);
  });

  //show => get specific order product
  it('should get  specific order product with specified id', async () => {
    const getOP =
      await opModel.show(
        orderProduct.id as string
      );
    expect(
      getOP
    ).toEqual({
      id: orderProduct.id,
      quantity:
        500 as unknown as string,
      orderid:
        order.id,
      productid:
        product.id,
    } as unknown as IOrderProduct);
  });

  //update
  it('should get the updated user given the updated data', async () => {
    const getUpdatedOP =
      await opModel.edit(
        {
          quantity:
            '1000',
          orderID:
            order.id,
          productID:
            product.id,
        } as unknown as IOrderProduct
      );
    expect(
      getUpdatedOP.quantity
    ).toEqual(
      1000 as unknown as string
    );
  });

  //delete
  it('should get the deleted user given the delete id', async () => {
    const getDeletedOP =
      await opModel.delete(
        orderProduct
      );
    expect(
      getDeletedOP.id
    ).toEqual(
      orderProduct.id
    );
    expect(
      getDeletedOP.quantity
    ).toEqual(
      1000 as unknown as string
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
