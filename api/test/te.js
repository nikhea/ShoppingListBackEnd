exports.updateOneItem = async (req, res, next) => {
	const id = req.params.ItemId;
	try {
		const item = await db.Items.findById(id);
		if (item) {
			item.name = req.body.name;
			item.price = req.body.price;
			item.isCompelete = req.body.isCompelete;
			item.itemImage = req.file.path;
			const newItem = await item.save();
			if (newItem) {
				res.status(200).json({ msg: 'Items Not Updated', newItem });
			} else {
				res.status(500).json({ msg: 'Items Not Updated' });
			}
		} else {
			res.status(404).json({ msg: 'No Valid entry found for provided ID' });
		}
	} catch (error) {
		res.status(500).json({ msg: 'Items Not Found', error });
	}
};



const item = await newItem.save();
if (item) {
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
				url: `http://localhost:3000/api/routes/item/${item._id} `
			}
		}
	};
	res.status(200).json(response);
} else {
	res.status(500).json({ msg: 'Items Not added', error });
}