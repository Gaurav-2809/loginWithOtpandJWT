import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Connection from './database/db.js';
import Router from '../server/Routes/router.js'

dotenv.config();

const app=express();

app.use(express.json());
app.use(cors());

app.use("/", Router);
const PORT=4002;

app.listen(PORT, ()=>{
    console.log(`server running at ${PORT}`);
})

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);
