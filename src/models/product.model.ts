import db from '../database';
import { IProduct } from '../interfaces/product.interface';

export class ProductModel {
  // get all products
  async index(): Promise<
    IProduct[]
  > {
    try {
      const conn =
        await db.connect();
      const sql =
        'SELECT * FROM products';
      const result =
        await conn.query(
          sql
        );
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `ERROR: Cannot get all products ${error}`
      );
    }
  }

  // create new product
  async create(
    product: IProduct
  ): Promise<IProduct> {
    try {
      const conn =
        await db.connect();
      const sql =
        'INSERT INTO products (name, category, price) VALUES ($1, $2, $3) RETURNING *';
      const result =
        await conn.query(
          sql,
          [
            product.name,
            product.category,
            product.price,
          ]
        );
      conn.release();
      return result
        .rows[0];
    } catch (error) {
      throw new Error(
        `ERROR: Cannot add new product ${error}`
      );
    }
  }

  // get specific product
  async show(
    id: string
  ): Promise<IProduct> {
    try {
      const conn =
        await db.connect();
      const sql =
        'SELECT * FROM products WHERE id=($1)';
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
        `ERROR: Cannot get specific product ${error}`
      );
    }
  }

  // update product
  async edit(
    product: IProduct
  ): Promise<IProduct> {
    try {
      const conn =
        await db.connect();
      const sql =
        'UPDATE products SET name=$2, category=$3, price=$4  WHERE id=($1) RETURNING *';
      const result =
        await conn.query(
          sql,
          [
            product.id,
            product.name,
            product.category,
            product.price,
          ]
        );
      conn.release();
      return result
        .rows[0];
    } catch (error) {
      throw new Error(
        `ERROR: Cannot edit product ${error}`
      );
    }
  }

  // delete product
  async delete(
    id: string
  ): Promise<IProduct> {
    try {
      const conn =
        await db.connect();
      const sql =
        'DELETE FROM products WHERE id=($1) RETURNING *';
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
        `ERROR: Cannot delete product ${error}`
      );
    }
  }
}
