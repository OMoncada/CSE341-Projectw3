const express = require('express');
const router = express.Router();
const controller = require('../controllers/brands');
const { brandValidationRules, validateBrand } = require('../validators/brandValidator');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', brandValidationRules(), validateBrand, controller.create);
router.put('/:id', brandValidationRules(), validateBrand, controller.update);
router.delete('/:id', controller.delete);

module.exports = router;