import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db';

import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

connectDB();
app.use(cors());app.use(express.json());

app.get('/test', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express and MongoDB!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
