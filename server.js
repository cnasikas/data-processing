import express from 'express'
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import controllers from './controllers/controllers.js'
import config from './config.json';

let app = express()
let router = express.Router()

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

app.use('/api', controllers({config}));

app.listen(process.env.PORT || config.port, function () {
	console.log(`Started on port ${this.address().port}`);
});