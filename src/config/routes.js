module.exports.all_routes = (app) => {
  app.use("/api/auth", require("../auth/auth.routes"));
  app.use("/api/users", require("../modules/user/user.routes"));
  app.use("/api/categories", require("../modules/categories/category.routes"));
  app.use("/api/products", require("../modules/product/product.routes"));
  app.use("/api/orders", require("../modules/orders/order.routes"));
};
