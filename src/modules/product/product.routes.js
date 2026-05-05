const router = require("express").Router();
const controller = require("./product.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.post("/", authMiddleware, controller.createProduct);
router.get("/", authMiddleware, controller.getProducts);
router.get("/:id", authMiddleware, controller.getById);
router.put("/:id", authMiddleware, controller.updateProduct);
router.delete("/:id", authMiddleware, controller.deleteProduct);

module.exports = router;