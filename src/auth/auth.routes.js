const router = require("express").Router();
const controller = require("./auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/login", controller.login);
router.post("/password-reset/:userId", authMiddleware, controller.passwordReset);

module.exports = router;
