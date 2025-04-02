import express, { Application, NextFunction, Request, Response } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { AppConfig } from './configs/config';
import { PingRoutes } from './routes/ping.routes';
import { responseEnhancer } from './middlewares/responseEnhancer';
import { AuthRoutes } from './routes/auth.routes';

const app: Application = express();

function setupMiddleware() {
  app.use(responseEnhancer);
  app.disable('etag');
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
  });
  app.use(express.json());
  app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
  });
}

function setupRoutes() {
  app.use(PingRoutes);
  app.use('/auth', AuthRoutes);
}

function setupServer(): void {
  const port = AppConfig.port;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

export function server() {
  setupServer();
  setupMiddleware();
  setupRoutes();
}

server();
