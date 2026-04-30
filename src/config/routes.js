module.exports.all_routes = (app) => {
  app.use("/api/auth", require("../auth/auth.routes"));
  app.use("/api/users", require("../modules/user/user.routes"));
};