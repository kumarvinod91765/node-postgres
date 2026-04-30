const router = require("express").Router();
const controller = require("./user.controller");

router.post("/", controller.createUser);
router.get("/", controller.getUsers);
router.get("/:id", controller.getById);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;