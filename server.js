import express from 'express'
import Web3 from 'web3'
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes/routes.js'
import config from './config.json';

const app = express()
const web3 = new Web3()
const router = express.Router();

const port = process.env.PORT || config

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

routes(router)

app.use('/api', router);

app.listen(process.env.PORT || config.port, function () {
	console.log(`Started on port ${this.address().port}`);
});