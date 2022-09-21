/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS users(
    id         uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    email      VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name  VARCHAR(20) NOT NULL,
    password   VARCHAR(255)  NOT NULL
)