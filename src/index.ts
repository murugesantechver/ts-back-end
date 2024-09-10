import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import dotenv from 'dotenv';
import { loadEnvironment } from './utils/core.utils';
dotenv.config();

loadEnvironment();

const app: Application = express();
const port = process.env.PORT || 3000;

connectDB();
app.use(cors());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express and MongoDB !!!!!!!!!!!!!!');
});

app.listen(port, () => {
  console.log(`Server is running on ${process.env.NODE_ENV === 'production' ? 'https://ts-back-end.onrender.com' : `http://localhost:${port}`}`);
});
