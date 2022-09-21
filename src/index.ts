import express, {
  Application,
} from 'express';
import routes from './routes/index';
import config from './config';
import cors from 'cors';

const app: Application =
  express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
app.use(cors(corsOptions));


// port number
const port =
  config.port ||
  3000;

app.use(
  express.json()
);

//main route
app.use(
  '/api',
  routes
);

app.listen(
  port,
  (): void => {
    console.log(
      `Server started on port:${port}`
    );
  }
);

export default app;
