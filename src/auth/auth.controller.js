const service = require("./auth.service");
const error = require("../utils/response").error;

exports.login = async (req, res, next) => {
  try {
    const data = await service.login(req.body);
    res.json({ success: true, msg: "Login successful", data });
  } catch (error) {
    next(error);
  }
};