import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import dotenv from 'dotenv';
//import { loadEnvironment } from './utils/core.utils';
dotenv.config();

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.prod' });
} else {
  dotenv.config({ path: '.env.dev' });
}

//loadEnvironment();

const app: Application = express();
const port = process.env.PORT || 3000;

connectDB();
app.use(cors());

app.use(express.json());

app.get('/test', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express and MongoDB!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
