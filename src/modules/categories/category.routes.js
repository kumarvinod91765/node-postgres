const router = require("express").Router();
const authMiddleware = require("../../middlewares/auth.middleware");
const controller = require("./category.controller");    

router.post("/", authMiddleware, controller.createCategory);
router.get("/", authMiddleware, controller.getCategories);
router.get("/:id", authMiddleware, controller.getById);
router.put("/:id", authMiddleware, controller.updateCategory);
router.delete("/:id", authMiddleware, controller.deleteCategory);

module.exports = router;
