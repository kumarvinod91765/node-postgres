const service = require("./auth.service");

exports.login = async (req, res, next) => {
  try {
    const data = await service.login(req.body);
    res.json({ success: true, msg: "Login successful", data });
  } catch (err) {
    next(err);
  }
};
