import { Pool } from 'pg';
import config from '../config';

const db = new Pool(
  {
    port: config.dbPort,
    database:
      config.database,
    host: config.host,
    user: config.user,
    password:
      config.password,
  }
);

db.on(
  'connect',
  () => {
    console.log(
      'Database is connected'
    );
  }
);
db.on(
  'remove',
  () => {
    console.log(
      'Database is disconnected'
    );
  }
);
db.on(
  'error',
  (
    error: Error
  ) => {
    console.log(
      'ERROR: An error has occured while connecting to the database',
      error.message
    );
  }
);
export default db;
