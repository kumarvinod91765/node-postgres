const router = require("express").Router();
const authMiddleware = require("../../middlewares/auth.middleware");
const controller = require("./category.controller");    

router.post("/", authMiddleware, controller.createCategory);
router.get("/", controller.getCategories);
router.get("/:id", controller.getById);
router.put("/:id", authMiddleware, controller.updateCategory);
router.delete("/:id", authMiddleware, controller.deleteCategory);

module.exports = router;