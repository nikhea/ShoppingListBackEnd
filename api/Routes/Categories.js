const express = require('express');
const router = express.Router();

const { getCategories, addCategories, removeCategories, getOneCategorie } = require('../Controller/Categories');

router.route('/').get(getCategories).post(addCategories);

router.route('/:CategoriesId').get(getOneCategorie).delete(removeCategories);
module.exports = router;
