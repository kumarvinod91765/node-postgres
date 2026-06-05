const service = require("./category.service");

exports.createCategory = async (req, res, next) => {
  try {
    const category = await service.createCategory(req.body);
    res.json(category);
  } catch (err) {
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await service.getCategories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const category = await service.getById(id);
    res.json(category);
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const category = await service.updateCategory(id, req.body);
    res.json(category);
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const result = await service.deleteCategory(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
