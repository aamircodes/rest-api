import express from 'express';
import http from 'http';
import bodyParson from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './router';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParson.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server running on PORT: 8080');
});

const MONGO_URL =
  'mongodb+srv://aamir1:jWw2JpVLyBH22FjF@cluster0.njh6wxx.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());
