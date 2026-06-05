const service = require("./product.service");

exports.createProduct = async (req, res, next) => {
  try {
    const product = await service.createProduct(req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await service.getProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const product = await service.getById(id);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const product = await service.updateProduct(id, req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const result = await service.deleteProduct(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
