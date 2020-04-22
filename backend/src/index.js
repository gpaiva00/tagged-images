const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

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

app.listen(process.env.PORT || 3333);
