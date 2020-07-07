const db = require('../db');
const mongoose = require('mongoose');

exports.getCategories = async (req, res, next) => {
	try {
		const Categories = await db.Categories.find().populate('items').exec();
		if (Categories) {
			res.status(200).json(Categories);
		} else {
			res.status(500).json({ msg: 'Categories Not Found' });
		}
	} catch (error) {
		res.status(500).json({ msg: 'Categories Not Found', error });
	}
};

exports.addCategories = async (req, res, next) => {
	try {
		const { name } = req.body;
		const NewCategories = new db.Categories({
			_id: new mongoose.Types.ObjectId(),
			name
		});

		const categories = await NewCategories.save();
		if (categories) {
			res.status(200).json(categories);
		} else {
			res.status(500).json({ msg: 'Categories Not Added', error });
		}
	} catch (error) {
		res.status(500).json({ msg: 'Categories Not Added', error });
	}
};


