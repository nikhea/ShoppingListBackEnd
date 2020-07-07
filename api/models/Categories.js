const mongoose = require('mongoose');
Schema = mongoose.Schema;

let CategoriesSchema = new Schema({
	name: {
		type: String,
		require: true
	},
	items: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Item',
			require: true
		}
	],

	date: {
		type: Date,
		default: Date.now
	}
});
CategoriesSchema.set('timeStamps', true);

let CATEGORIES = mongoose.model('Categorie', CategoriesSchema);

module.exports = CATEGORIES;
