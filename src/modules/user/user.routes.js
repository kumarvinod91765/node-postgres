const router = require("express").Router();
const controller = require("./user.controller");

router.post("/", controller.createUser);
router.get("/", controller.getUsers);

module.exports = router;