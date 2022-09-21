import { ProductModel } from '../../models/product.model';
import { IProduct } from '../../interfaces/product.interface';
import db from '../../database';

const pModel =
  new ProductModel();
const product: IProduct =
  {
    name: 'ps5',
    category:
      'gaming',
    price: 10000.999,
  };

describe('Product CRUD Operations Suite', () => {
  //create
  it('should create a new product and return it', async () => {
    const createdProduct =
      await pModel.create(
        product
      );
    console.log(
      typeof product.price
    );
    console.log(
      typeof createdProduct.price
    );
    expect(
      createdProduct
    ).toEqual({
      id: createdProduct.id,
      name: product.name,
      category:
        product.category,
      price:
        product.price.toString(),
    } as unknown as IProduct);
    product.id =
      createdProduct.id;
  });

  //index => get all users
  it('should get all products and ensure that there is product created', async () => {
    const getAllProducts =
      await pModel.index();
    const numProducts =
      getAllProducts.length;
    expect(
      numProducts
    ).toEqual(1);
  });

  //show => get specific user
  it('should get the product with the specified product id', async () => {
    const getProduct =
      await pModel.show(
        product.id as string
      );
    expect(
      getProduct
    ).toEqual({
      id: product.id,
      name: product.name,
      category:
        product.category,
      price:
        product.price.toString(),
    } as unknown as IProduct);
  });

  //update
  it('should get the updated order given the updated data', async () => {
    const getUpdatedProduct =
      await pModel.edit(
        {
          id: product.id,
          name: 'ps3',
          category:
            product.category,
          price:
            (5000.999).toString(),
        } as unknown as IProduct
      );
    expect(
      getUpdatedProduct.name
    ).toEqual(
      'ps3'
    );
    expect(
      getUpdatedProduct.price.toString()
    ).toEqual(
      '5000.999'
    );
  });

  //delete
  it('should get the deleted order given the order id', async () => {
    const getDeletedProduct =
      await pModel.delete(
        product.id as string
      );
    expect(
      getDeletedProduct.id
    ).toEqual(
      product.id
    );
    expect(
      getDeletedProduct.name
    ).toBe('ps3');
    expect(
      getDeletedProduct.category
    ).toBe(
      product.category
    );
    expect(
      getDeletedProduct.price.toString()
    ).toBe(
      '5000.999'
    );
  });

  afterAll(
    async () => {
      const conn =
        await db.connect();
      const sql =
        'DELETE FROM products';
      await conn.query(
        sql
      );
      conn.release();
    }
  );
});
