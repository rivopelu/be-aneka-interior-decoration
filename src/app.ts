import express, { Application } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { AppConfig } from './configs/config';
import { PingRoutes } from './routes/ping.routes';
import { responseEnhancer } from './middlewares/responseEnhancer';
import { AuthRoutes } from './routes/auth.routes';
import { accountRoutes } from './routes/account.routes';

const app: Application = express();

function setupRoutes() {
  app.use(PingRoutes);
  app.use('/auth', AuthRoutes);
  app.use('/account', accountRoutes);
}

function setupServer(): void {
  const port = AppConfig.port;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

function setupMiddlewares() {
  app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
  });
  app.use(responseEnhancer);
  app.use(express.json());
}

export function server() {
  setupServer();
  setupMiddlewares();
  setupRoutes();
  app.use(errorHandler);
}

server();
