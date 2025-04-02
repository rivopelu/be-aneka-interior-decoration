import express, { Application, NextFunction, Request, Response } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { AppConfig } from './configs/config';
import { PingRoutes } from './routes/PingRoutes';

const app: Application = express();

function setupMiddleware() {
  app.use(express.json());
  app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
  });
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
  });
}

function setupRoutes() {
  app.use(PingRoutes);
}

function setupServer(): void {
  const port = AppConfig.port;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

export function server() {
  setupMiddleware();
  setupRoutes();
  setupServer();
}
