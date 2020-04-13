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

// { origin: process.env.LOCAL_CLIENT }
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
