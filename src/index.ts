import express from 'express';
import databaseConnect from './config/database';
import router from "./routes/router";
import cors from 'cors';

require('dotenv').config();

const app = express();

databaseConnect();


app.use(express.json());

app.use(cors());

app.use(router);

app.listen(4000, () => {
  console.log(`server running on port 4000`);
});