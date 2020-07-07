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
