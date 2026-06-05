const router = require("express").Router();
const authMiddleware = require("../../middlewares/auth.middleware");
const controller = require("./user.controller");

router.post("/",authMiddleware, controller.createUser);
router.get("/", authMiddleware, controller.getUsers);
router.get("/admin-profile", authMiddleware, controller.adminProfile);
router.get("/:id", authMiddleware, controller.getById);
router.put("/:id", authMiddleware, controller.updateUser);
router.delete("/:id", authMiddleware, controller.deleteUser);

module.exports = router;
