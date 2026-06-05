const service = require("./user.service");

exports.createUser = async (req, res, next) => {
  try {
    const user = await service.createUser(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await service.getUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await service.getById(id);

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await service.updateUser(id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const result = await service.deleteUser(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.adminProfile = async (req, res, next) => {
  try {
    const role = "Admin";

    const result = await service.getAdminProfile(role);

    res.json(result);
  } catch (err) {
    next(err);
  }
};
