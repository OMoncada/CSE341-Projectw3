const { body, validationResult } = require('express-validator');

const brandValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
  body('country').notEmpty().withMessage('Country is required'),
  body('founded').isInt({ min: 1800, max: new Date().getFullYear() })
    .withMessage('Founded year must be valid'),
];

const validateBrand = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(422).json({ errors: errors.array().map(e => ({ [e.param]: e.msg })) });
};

module.exports = { brandValidationRules, validateBrand };
