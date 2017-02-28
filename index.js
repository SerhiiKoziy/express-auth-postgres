import http from 'http';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import sessionMiddleware from './middleware/sessionMiddleware';
import initializeDb from './db';
import api from './api';
import config from './config.json';
import db from './models';

let server = express();

server.use(sessionMiddleware());

server.use(cors({
	exposedHeaders: config.corsHeaders
}));

server.use(bodyParser.json({
	limit : config.bodyLimit
}));
server.use(bodyParser.urlencoded({ extended: true }));

server.use(logger('dev'));


server.use('/user', api(db));
server.listen(process.env.PORT || 8080, () => {
		db.sequelize.sync();
});
console.log(`Started on port ${server.port}`);

export default server;
