const router = require("express").Router();
const controller = require("./product.controller");

router.post("/", controller.createProduct);
router.get("/", controller.getProducts);
router.get("/:id", controller.getById);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);

module.exports = router;