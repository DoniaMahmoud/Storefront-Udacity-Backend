# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index - GET - /api/products/getProducts
  body:none
- Show - GET - /api/products/getProduct/:id
  id=> product id
- Create [token required] - POST - /api/products/create
  body:{
  "name":"ps5",
  "category":"gaming",
  "price":1000.999
  }
- edit - PATCH - /api/products/update
  body: {
  "id": product id,
  "name": "marwa7a", => data to be updated
  "category": "air", => data to be updated
  "price":"4500" => data to be updated
  }
- delete - DELETE - /api/products/delete/:id
  id => product id
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Create - POST - /api/users/create
  body:{
  "email": "user@gmail.com ",
  "first_name": "user",
  "last_name": "user",
  "password":"password"
  }
- Login [token required ] - POST - /api/users/login
  body:{
  "email": "user@gmail.com ",
  "password":"password"
  }
- Index [token required] - GET - /api/users/getUsers
  body: none
- Show [token required] - GET - /api/users/getUser/:id
  id => user id
  body: none

- edit [token required] - PATCH - /api/users/update
  body:{
  "id": user id,
  "email": "user@gmail.com ", => data to be updated
  "first_name": "user ", => data to be updated
  "last_name": "user", => data to be updated
  "password":"password" => data to be updated
  }

- delete [token required] - DELETE - /api/users/delete/:id
  id => user id
  body: none

#### Orders

- Current Order by user [token required] - GET - /api/orders/getOrderbyUser/:id
  id => user id
  body: none
- Create - POST - /api/orders/create
  body:{
  "status":"complete", => status can be "complete" or "active" only
  "userID": user id
  }

- Index - GET - /api/orders/getOrders
  body: none
- Show - GET - /api/orders/getOrder/:id
  id => order id
  body: none

- edit - PATCH - /api/orders/update
  body:{
  "id": order id,
  "status":"active", => data to be updated
  "userID":user id
  }

- delete - DELETE - /api/orders/delete/:id
  id => order id
  body: none

- [OPTIONAL] Completed Orders by user (args: user id)[token required]

#### Orders_Products

- Create - POST - /api/orderProducts/createOP
  body:{
  "quantity": "500", => data to be updated
  "orderID": order id,
  "productID": product id
  }

- Index - GET - /api/orderProducts/getOPs/:id
  body: none
  id : order id => (should create order product with this order id first to get order products)
- Show - GET - /api/orderProducts/getOP/:id
  id => order product id
  body: none

- edit - POST - /api/orderProducts/update
  body:{
  "quantity": 12333, => data to be updated
  "orderID": order id ,
  "productID": product id
  }

- delete - DELETE - /api/orderProducts/delete
  body:{
  "orderID": order id ,
  "productID": product id
  }

## Schemas

#### Product

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products(
id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
name VARCHAR(20) NOT NULL,
category VARCHAR(20) NOT NULL,
price NUMERIC (10,3) NOT NULL
)

#### User

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS users(
id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
email VARCHAR(50) UNIQUE NOT NULL,
first_name VARCHAR(20) NOT NULL,
last_name VARCHAR(20) NOT NULL,
password VARCHAR(255) NOT NULL
)

#### Orders

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS orders(
id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
status VARCHAR(20) ,
userID uuid REFERENCES users(id)
)

#### Orders_Products

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS orders_products(
id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
quantity INTEGER,
orderID uuid REFERENCES orders(id) NOT NULL,
productID uuid REFERENCES products(id) NOT NULL

)

## Data Shapes

#### Product

export interface IProduct {
id?: string;
name: string;
category: string;
price: number;
}

#### User

export interface IUser {
id?: string;
email: string;
first_name: string;
last_name: string;
password: string;
}

#### Orders

export interface IOrder {
id?: string;
status:
| 'active'
| 'complete';
userID: string;
products?: IOrderProduct[];
}
