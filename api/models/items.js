const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	itemImage: {
		type: String,
		required: true
	},
	isCompelete: {
		type: Boolean,
		default: false
	},
	date: {
		type: Date,
		default: Date.now
	}
});
ItemSchema.set('timestamps', true)
let ITEMS = mongoose.model('Item', ItemSchema);

module.exports = ITEMS;
