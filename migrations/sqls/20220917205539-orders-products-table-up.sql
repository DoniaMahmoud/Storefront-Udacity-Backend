/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS orders_products(
    id         uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    quantity   INTEGER,
    orderID  uuid REFERENCES orders(id) NOT NULL,
    productID uuid REFERENCES products(id) NOT NULL

)