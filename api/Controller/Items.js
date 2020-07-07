const db = require('../db');
const mongoose = require('mongoose');
exports.getItem = async (req, res, next) => {
	const id = req.params.CategoriesId;
	try {
		const Items = await db.Items
			.findById(id)
			.select('name price itemImage isCompelete date createdAt updatedAt')
			.exec();
		console.log(Items);
		if (Items) {
			const response = {
				msg: 'Items',
				count: Items.length,
				items: Items.map((item) => {
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
			};
			res.status(200).json(response);
		} else {
			res.status(500).json({ msg: 'Items Not Found', error });
		}
	} catch (error) {
		res.status(500).json({ msg: 'Items Not Found', error });
	}
};

exports.addItem = async (req, res, next) => {
	const id = req.params.CategoriesId;
	try {
		const categories = await db.Categories.findById(id);
		if (categories) {
			const { name, price, isCompelete } = req.body;
			const itemImage = req.file.path;
			const newItem = new db.Items({
				_id: new mongoose.Types.ObjectId(),
				name,
				price,
				isCompelete,
				itemImage
			});
			const item = await db.Items.create(newItem)
			if (item) {
				categories.items.push(item)
				categories.save()
				const response = {
					msg: 'Item added successfully ',
					createdItem: {
						name: item.name,
						price: item.price,
						itemImage: item.itemImage,
						created_at: item.createdAt,
						updated_at: item.updatedAt,
						_id: item._id,
						resquest: {
							types: 'GET',
							url: `http://localhost:3000/api/routes/categories/${categories._id} `
						}
					}
				};
				res.status(201).json(response);


			} else {
				res.status(500).json({ msg: 'Items Not added', error })
			}
		} else {
			res.status(404).json({ msg: 'No Valid Entry Categories ID' });
		}
	} catch (error) {
		res.status(500).json({ msg: 'Items Not added', error });
	}
};
exports.updateOneItem = async (req, res, next) => {
	const id = req.params.ItemId;
	try {
		let UpdateItem = {};
		UpdateItem.name = req.body.name;
		UpdateItem.isCompeleted = req.body.isCompeleted;

		let item = await db.Items.updateOne({ _id: id }, { $set: { UpdateItem } }).exec();
		console.log(item);
		res.json(item);
	} catch (error) {
		res.status(500).json({ msg: 'Items Not Updated', error });
	}
};

exports.getOneItem = async (req, res, next) => {
	const id = req.params.ItemId;
	console.log(id);
	try {
		const item = await db.Items.findById(id);
		if (item) {
			const response = {
				Item: {
					name: item.name,
					price: item.price,
					itemImage: item.itemImage,
					created_at: item.createdAt,
					updated_at: item.updatedAt,
					date: item.date,
					_id: item._id,
					resquest: {
						types: 'GET',
						url: `http://localhost:3000/api/routes/item/${item._id} `
					}
				}
			};
			res.status(200).json(response);
		} else {
			res.status(404).json({ msg: 'No Valid entry found for provided ID' });
		}
	} catch (error) {
		res.status(500).json({ msg: 'Items Not Found', error });
	}
};
exports.removeItem = async (req, res, next) => {
	try {
		const id = req.params.ItemId;
		const items = await db.Items.remove({ _id: id });
		if (items) {
			const response = {
				msg: 'Item deleted',
				request: {
					type: 'GET',
					url: ' http://localhost:3000/api/routes/item/',
					body: { name: 'String', price: 'Number' }
				}
			};
			res.status(200).json(response);
		} else {
			res.status(404).json({ msg: 'No Valid entry found for provided ID' });
		}
	} catch (err) {
		
		res.status(500).json({ msg: 'Item unable to delete', err: err });
	}
};
