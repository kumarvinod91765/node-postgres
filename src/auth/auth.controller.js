const service = require("./auth.service");

exports.login = async (req, res, next) => {
  try {
    const data = await service.login(req.body);
    res.json({ success: true, msg: "Login successful", data });
  } catch (err) {
    next(err);
  }
};

exports.passwordReset = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { oldPassword, newPassword, confirmPassword } = req.body;
   
    await service.changePassword(userId, { currentPassword: oldPassword, newPassword, confirmPassword });
    res.json({ success: true, msg: "Password changed successfully" });
  }

  catch (err) {
    next(err);
  }
};
