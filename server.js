import express from 'express'
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import init from './services/Init.js'

import nodeMiddleware from './middlewares/NodeMiddleware.js'

import controllers from './controllers/controllers.js'
import config from './config.json';

import node from './services/Node.js' /* Bootstrap it and handle async etc!! */

/* TODO: CHECK SECURITY */
/* TODO: Handle errors! */

const app = express()

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

app.use(nodeMiddleware())

app.use('/api', controllers({config}))

init()

app.listen(process.env.PORT || config.port, function () {
	console.log(`Started on port ${this.address().port}`);
});