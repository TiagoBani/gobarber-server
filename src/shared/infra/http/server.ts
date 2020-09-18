import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import routes from './routes/index';

import '@shared/infra/typeorm';
import '@shared/container';

const PORT = process.env.PORT || 3333;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));

app.get('/', (_, response) => {
  response.json({ message: 'OK' });
});

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  console.error(err.message);
  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(PORT, () => console.log(`Server running ${PORT}`));