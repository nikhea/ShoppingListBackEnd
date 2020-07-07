const express = require('express');
const router = express.Router();

const { getCategories, addCategories } = require('../Controller/Categories');

router.route('/').get(getCategories).post(addCategories);

router.route('/:CategoriesId');
module.exports = router;
