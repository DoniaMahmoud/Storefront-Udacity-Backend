import { OrderModel } from '../../models/order.model';
import { IOrder } from '../../interfaces/order.interface';
import { UserModel } from '../../models/user.model';
import { IUser } from '../../interfaces/user.interface';
import db from '../../database';

const uModel =
  new UserModel();
const oModel =
  new OrderModel();

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
describe('Order CRUD Operations Suite', () => {
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

  //create
  it('should create a new order and return it', async () => {
    const createdOrder =
      await oModel.create(
        order
      );
    expect(
      createdOrder
    ).toEqual({
      id: createdOrder.id,
      status:
        order.status,
      userid:
        order.userID,
    } as unknown as IOrder);
    order.id =
      createdOrder.id;
  });
  //index => get all users
  it('should get all orders and ensure that there is order created', async () => {
    const getAllOrders =
      await oModel.index();
    const numOrders =
      getAllOrders.length;
    expect(
      numOrders
    ).toEqual(1);
  });
  //show => get specific user
  it('should get the order with the specified order id', async () => {
    const getOrder =
      await oModel.show(
        order.id as string
      );
    expect(
      getOrder
    ).toEqual({
      id: order.id,
      status:
        order.status,
      userid:
        order.userID,
    } as unknown as IOrder);
  });
  //get order by  user
  it('should get order by user id', async () => {
    const getOrderByUser: IOrder =
      await oModel.getOrderByUser(
        user.id as string
      );
    expect(
      getOrderByUser.id
    ).toBe(
      order.id
    );
    expect(
      getOrderByUser.status
    ).toBe(
      order.status
    );
  });
  //update
  it('should get the updated order given the updated data', async () => {
    const getUpdatedOrder =
      await oModel.edit(
        {
          id: order.id,
          status:
            'complete',
          userid:
            user.id,
        } as unknown as IOrder
      );
    expect(
      getUpdatedOrder.status
    ).toEqual(
      'complete'
    );
  });

  //delete
  it('should get the deleted order given the order id', async () => {
    const getDeletedOrder =
      await oModel.delete(
        order.id as string
      );
    expect(
      getDeletedOrder.id
    ).toEqual(
      order.id
    );
    expect(
      getDeletedOrder.status
    ).toBe(
      'complete'
    );
    // expect(getDeletedOrder.userID).toEqual(order.userID);
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
