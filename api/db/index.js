const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connection
	.once('open', () => {
		console.log('mongoose connected');
	})
	.on('error', () => {
		// console.log('Connectin error',error);
		console.log('Connectin error', 'error');
	});

let url = process.env.DATABASEURL || 'mongodb://localhost/SHOPPINGlLIST';
mongoose
	.connect(url,{ useUnifiedTopology: true, useNewUrlParser: true } )
	.then((result) => {
		console.log('mongodb Connected');
	})
	.catch((err) => {
		console.log('error', err);
	});

module.exports.Items = require('../models/items');
module.exports.Categories = require('../models/Categories');
