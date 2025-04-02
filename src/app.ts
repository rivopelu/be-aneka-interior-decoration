import express, { Application, Request, Response } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { AppConfig } from './configs/config';

const app: Application = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.get('/', async (req: Request, res: Response) => {
  console.log('masuk');
  res.status(200).send('OK');
});
Ø;

app.use(errorHandler);

function setupServer(): void {
  const port = AppConfig.port;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

export function server() {
  setupServer();
}
