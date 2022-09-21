import db from '../database';
import { IOrder } from '../interfaces/order.interface';

export class OrderModel {
  // get all orders
  async index(): Promise<
    IOrder[]
  > {
    try {
      const conn =
        await db.connect();
      // const sql= 'SELECT orders.id, orders.status, orders.userID , orders_products.productID, orders_products.quantity FROM orders_products, orders'
      const sql =
        'SELECT * FROM  orders';

      const result =
        await conn.query(
          sql
        );
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `ERROR: Cannot get all orders ${error}`
      );
    }
  }

  // create new order
  async create(
    order: IOrder
  ): Promise<IOrder> {
    try {
      const conn =
        await db.connect();
      const sql =
        'INSERT INTO orders (status,  userID) VALUES ($1, $2) RETURNING *';
      const result =
        await conn.query(
          sql,
          [
            order.status,
            order.userID,
          ]
        );
      conn.release();
      return result
        .rows[0];
    } catch (error) {
      throw new Error(
        `ERROR: Cannot add new order ${error}`
      );
    }
  }

  // get specific order
  async show(
    id: string
  ): Promise<IOrder> {
    try {
      const conn =
        await db.connect();
      // const sql = 'SELECT orders.id, orders.status, orders.userID , orders_products.productID, orders_products.quantity FROM orders_products, orders WHERE orders.id=($1)';
      const sql =
        'SELECT * FROM orders WHERE id=($1)';

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

  // update order
  async edit(
    order: IOrder
  ): Promise<IOrder> {
    try {
      const conn =
        await db.connect();
      const sql =
        'UPDATE orders SET status=$2, userID=$3 WHERE id=($1) RETURNING *';
      const result =
        await conn.query(
          sql,
          [
            order.id,
            order.status,
            order.userID,
          ]
        );
      conn.release();
      return result
        .rows[0];
    } catch (error) {
      throw new Error(
        `ERROR: Cannot edit order ${error}`
      );
    }
  }

  // delete order
  async delete(
    id: string
  ): Promise<IOrder> {
    try {
      const conn =
        await db.connect();
      const sql =
        'DELETE FROM orders WHERE id=($1) RETURNING *';
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
        `ERROR: Cannot delete order ${error}`
      );
    }
  }
  // get order by user id
  async getOrderByUser(
    userID: string
  ): Promise<IOrder> {
    try {
      const conn =
        await db.connect();
      const sql =
        'SELECT * FROM orders WHERE userID=$1';
      const result =
        await conn.query(
          sql,
          [userID]
        );
      console.log(
        'USER ID IN MODEL ',
        userID
      );
      return result
        .rows[0];
    } catch (error) {
      throw new Error(
        `ERROR: Cannot get order by user id ${error}`
      );
    }
  }
}
