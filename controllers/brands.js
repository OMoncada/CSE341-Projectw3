const Brand = require('../models/brand');
const Api404Error = require('../middleware/api404Error');

exports.getAll = async (req, res) => {
  const brands = await Brand.find();
  res.status(200).json(brands);
};

exports.getOne = async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) throw new Api404Error(`Brand with ID ${req.params.id} not found`);
  res.status(200).json(brand);
};

exports.create = async (req, res) => {
  const brand = new Brand(req.body);
  const newBrand = await brand.save();
  res.status(201).json(newBrand);
};

exports.update = async (req, res) => {
  const updated = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!updated) throw new Api404Error(`Brand with ID ${req.params.id} not found`);
  res.status(200).json(updated);
};

exports.delete = async (req, res) => {
  const deleted = await Brand.findByIdAndDelete(req.params.id);
  if (!deleted) throw new Api404Error(`Brand with ID ${req.params.id} not found`);
  res.status(200).json({ message: 'Brand deleted' });
};