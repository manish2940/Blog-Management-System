import Connection from './database/db.js';
import express from 'express';
import dotenv from 'dotenv';
import router from './router/route.js';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();
const app = express();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
Connection(username,password);
app.use(bodyParser.json());

app.use(cors());
app.use('/',router);
const PORT = 8000;
// app.use(bodyParser.json({extended:true}));
// app.use(bodyParser.urlencoded({extended:true}));

app.listen(PORT,()=>console.log(`server is running on PORT ${PORT}`));




