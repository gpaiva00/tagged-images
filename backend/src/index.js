import express from 'express';
import cors from 'cors';
import routes from './routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express();

app.use(cors({ origin: process.env.LOCAL_CLIENT }));
app.use(express.json());
app.use(routes);

app.listen(3001);
