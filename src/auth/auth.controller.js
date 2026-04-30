const service = require("./auth.service");

exports.login = async (req, res, next) => {
  try {
    const data = await service.login(req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};