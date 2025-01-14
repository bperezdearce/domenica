import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import indexRouter from "./routes/indexRouter";

const server = express();

server.use(cors({ origin: "http://localhost:3000" }));
server.use(morgan('dev'));
server.use(express.json());
server.use(indexRouter);

export default server;