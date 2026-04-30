const service = require("./user.service");
const error = require("../../utils/response").error;

exports.createUser = async (req, res, next) => {
  try {
    const user = await service.createUser(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await service.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const user = await service.getById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  } 
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await service.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const result = await service.deleteUser(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};