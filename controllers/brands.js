const Brand = require('../models/brand');
const Api404Error = require('../middleware/api404Error');

exports.getAll = async (req, res, next) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (err) {
    next(err); 
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) throw new Api404Error(`Brand with ID ${req.params.id} not found`);
    res.status(200).json(brand);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const brand = new Brand(req.body);
    const newBrand = await brand.save();
    res.status(201).json(newBrand);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) throw new Api404Error(`Brand with ID ${req.params.id} not found`);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deleted = await Brand.findByIdAndDelete(req.params.id);
    if (!deleted) throw new Api404Error(`Brand with ID ${req.params.id} not found`);
    res.status(200).json({ message: 'Brand deleted' });
  } catch (err) {
    next(err);
  }
};
