/* Replace with your SQL commands */
/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products(
    id        uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name      VARCHAR(20)  NOT NULL,
    category  VARCHAR(20)  NOT NULL,
    price     NUMERIC (10,3) NOT NULL
)