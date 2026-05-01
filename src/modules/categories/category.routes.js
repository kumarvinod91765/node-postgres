const router = require("../user/user.routes");
const controller = require("./category.controller");    

router.post("/", controller.createCategory);
router.get("/", controller.getCategories);
router.get("/:id", controller.getById);
router.put("/:id", controller.updateCategory);
router.delete("/:id", controller.deleteCategory);

module.exports = router;