const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const ItemRoutes = require('./api/Routes/Items');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin-X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Headers', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
		return res.status(200).json({});
	}
	next();
});
app.get('/', (req, res, next) => {
	res.end('hello world');
});

app.use('/api/routes/item', ItemRoutes);

app.use((req, res, next) => {
	const error = new Error('NOT FOUND ');
	error.status = 404;
	next(error);
});
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
