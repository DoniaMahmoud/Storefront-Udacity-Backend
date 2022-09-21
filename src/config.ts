import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  NODE_ENV,
  DB_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_DBPort,
  POSTGRES_DB_Test,
  PEPPER,
  SALT,
  SECRET_TOKEN,
} = process.env;

export default {
  port: Number(
    PORT
  ),
  database:
    NODE_ENV ===
    'dev'
      ? POSTGRES_DB
      : POSTGRES_DB_Test,
  host: DB_HOST,
  user: POSTGRES_USER,
  password:
    POSTGRES_PASSWORD,
  dbPort: Number(
    POSTGRES_DBPort
  ),
  pepper: PEPPER,
  salt: SALT,
  secretToken:
    SECRET_TOKEN,
};
