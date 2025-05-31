const express = require('express');
const router = express.Router();
const controller = require('../controllers/products');
const { productValidationRules, validate } = require('../validators/productValidator');
const { isAuthenticated } = require('../middleware/authenticate'); 

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);

// Estas requieren autenticación:
router.post('/', isAuthenticated, productValidationRules(), validate, controller.create);
router.put('/:id', isAuthenticated, productValidationRules(), validate, controller.update);
router.delete('/:id', isAuthenticated, controller.delete);

module.exports = router;
