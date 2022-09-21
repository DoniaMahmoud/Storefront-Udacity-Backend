import db from '../database';

import { IOrderProduct } from '../interfaces/orders-products.interface';

export class OrdersProductsModel {
  // const sql
  // = 'SELECT o.id, op.product_id, o.status, o.user_id, SUM(quantity) AS quantity FROM order_products op JOIN orders o ON op.order_id = o.id AND o.id = $1 group by op.product_id, o.ids';
  // const sql3
  // =  "SELECT products_id_PK,name,price,category,quantity,order_id_FK FROM products INNER JOIN order_products ON order_products.product_id_FK = products.products_id_PK where order_id_FK = ($1)"
  // get all products in order with given id

  async index(
    orderID: string
  ): Promise<
    IOrderProduct[]
  > {
    try {
      const conn =
        await db.connect();
      const sql =
        'SELECT * FROM orders_products INNER JOIN  orders ON orders_products.orderID =orders.id AND orders.id = ($1) ';
      // const sql=

      const result =
        await conn.query(
          sql,
          [orderID]
        );
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `ERROR: Cannot get all order products ${error}`
      );
    }
  }

  // create new order product
  async create(
    orderProduct: IOrderProduct
  ): Promise<IOrderProduct> {
    try {
      const conn =
        await db.connect();
      const sql =
        'INSERT INTO orders_products (quantity, orderID, productID) VALUES ($1, $2, $3) RETURNING *';
      const result =
        await conn.query(
          sql,
          [
            orderProduct.quantity,
            orderProduct.orderID,
            orderProduct.productID,
          ]
        );
      conn.release();
      return result
        .rows[0];
    } catch (error) {
      throw new Error(
        `ERROR: Cannot add new order product ${error}`
      );
    }
  }

  // get specific order  product
  async show(
    id: string
  ): Promise<IOrderProduct> {
    try {
      const conn =
        await db.connect();
      const sql =
        'SELECT * FROM orders_products WHERE id=($1)';
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
        `ERROR: Cannot get specific order product ${error}`
      );
    }
  }

  // update order product
  async edit(
    orderProduct: IOrderProduct
  ): Promise<IOrderProduct> {
    try {
      const conn =
        await db.connect();

      const sql1 =
        '(SELECT id FROM orders_products WHERE orderID=($2) AND productID =($3))';
      const sql2 = `UPDATE orders_products SET quantity = ($1) WHERE id = ${sql1} RETURNING *`;
      // const sql3=  `UPDATE orders_products SET quantity = ($1)  ,productID =($3) WHERE orderID=($2) RETURNING *`
      const result =
        await conn.query(
          sql2,
          [
            orderProduct.quantity,
            orderProduct.orderID,
            orderProduct.productID,
          ]
        );
      conn.release();
      return result
        .rows[0];
    } catch (error) {
      throw new Error(
        `ERROR: Cannot edit order product ${error}`
      );
    }
  }

  // delete order product
  async delete(
    orderProduct: IOrderProduct
  ): Promise<IOrderProduct> {
    try {
      const conn =
        await db.connect();
      const sql =
        'DELETE FROM orders_products WHERE orderID=($1) AND productID=($2) RETURNING *';
      const result =
        await conn.query(
          sql,
          [
            orderProduct.orderID,
            orderProduct.productID,
          ]
        );
      conn.release();
      return result
        .rows[0];
    } catch (error) {
      throw new Error(
        `ERROR: Cannot delete order product ${error}`
      );
    }
  }
}
