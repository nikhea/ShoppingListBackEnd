const db = require('../db');
const mongoose = require('mongoose');

exports.getCategories = async (req, res, next) => {
	try {
		const Categories = await db.Categories.find().populate('items').select('name date createdAt updatedAt').exec();
		console.log(Categories);
		if (Categories) {
			const response = {
				msg: 'Categories',
				count: Categories.length,
				categories: Categories.map((categories) => {
					return {
						_id: categories._id,
						name: categories.name,
						date: categories.date,
						created_at: categories.createdAt,
						updated_at: categories.updatedAt,
						resquest: {
							types: 'GET',
							url: `http://localhost:3000/api/routes/categories/${categories._id}`
						},
						items: categories.items.map((item) => {
							return {
								name: item.name,
								price: item.price,
								itemImage: item.itemImage,
								created_at: item.createdAt,
								updated_at: item.updatedAt,
								_id: item._id,
								resquest: {
									types: 'GET',
									url: `http://localhost:3000/api/routes/categories/${categories._id}/${item._id} `
								}
							};
						})
					};
				})
			};
			res.status(200).json(response);
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
			const response = {
				msg: 'Categories added successfully ',
				createdCategories: {
					name: categories.name,
					created_at: categories.createdAt,
					updated_at: categories.updatedAt,
					_id: categories._id,
					resquest: {
						types: 'GET',
						url: `http://localhost:3000/api/routes/categories/${categories._id} `
					}
				}
			};
			res.status(201).json(response);
		} else {
			res.status(500).json({ msg: 'Categories Not Added', error });
		}
	} catch (error) {
		res.status(500).json({ msg: 'Categories Not Added', error });
	}
};
exports.getOneCategorie = async (req, res, next) => {
	const id = req.params.CategoriesId;
	console.log(id);
	try {
		const categories = await db.Categories.findById(id).populate('items').exec();
		if (categories) {
			const response = {
				Categories: {
					name: categories.name,
					created_at: categories.createdAt,
					updated_at: categories.updatedAt,
					date: categories.date,
					_id: categories._id,
					resquest: {
						types: 'GET',
						url: `http://localhost:3000/api/routes/categories/ `
					},
					items: categories.items.map((item) => {
						return {
							name: item.name,
							price: item.price,
							itemImage: item.itemImage,
							created_at: item.createdAt,
							updated_at: item.updatedAt,
							_id: item._id,
							resquest: {
								types: 'GET',
								url: `http://localhost:3000/api/routes/item/${item._id} `
							}
						};
					})
				}
			};
			console.log(response);
			res.status(200).json(response);
		} else {
			res.status(404).json({ msg: 'No Valid entry found for provided ID' });
		}
	} catch (error) {
		res.status(500).json({ msg: 'Categorie Not Found', error });
	}
};
exports.removeCategories = async (req, res, next) => {
	const id = req.params.CategoriesId;
	try {
		const categories = await db.Categories.remove({ _id: id });
		if (categories) {
			const response = {
				msg: 'Categories deleted',
				request: {
					type: 'GET',
					url: ' http://localhost:3000/api/routes/categories'
				}
			};
			res.status(200).json(response);
		} else {
			res.status(404).json({ msg: 'No Valid entry found for provided ID' });
		}
	} catch (error) {
		res.status(500).json({ msg: 'Categorie unable to delete', err: err });
	}
};
