const express = require('express');
const router = express.Router();
const controller = require('../controllers/products');
const { productValidationRules, validate } = require('../validators/productValidator');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', productValidationRules(), validate, controller.create);
router.put('/:id', productValidationRules(), validate, controller.update);
router.delete('/:id', controller.delete);

module.exports = router;