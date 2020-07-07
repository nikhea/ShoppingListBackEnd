const express = require('express');
const router = express.Router();
const upload = require('../uitlis/ItemsImage');
const { getItem, addItem, removeItem, getOneItem, updateOneItem } = require('../Controller/Items');

router.route('/:CategoriesId/Items').get(getItem).post(upload.single('itemImage'), addItem);

router.route('/:CategoriesId/Items/:ItemId').delete(removeItem).get(getOneItem).patch(updateOneItem);
module.exports = router;
// upload.single('itemImage')
