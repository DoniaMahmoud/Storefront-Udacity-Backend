/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS orders(
    id       uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    status   VARCHAR(20)  ,
    userID  uuid REFERENCES users(id)
)