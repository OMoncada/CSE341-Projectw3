const express = require('express');
const router = express.Router();
const controller = require('../controllers/brands');
const { brandValidationRules, validateBrand } = require('../validators/brandValidator');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);

// Estas requieren autenticación:
router.post('/', isAuthenticated, brandValidationRules(), validateBrand, controller.create);
router.put('/:id', isAuthenticated, brandValidationRules(), validateBrand, controller.update);
router.delete('/:id', isAuthenticated, controller.delete);

module.exports = router;
