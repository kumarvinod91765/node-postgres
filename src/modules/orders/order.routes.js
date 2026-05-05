const router = require("express").Router();
const controller = require("./order.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.post("/", authMiddleware, controller.createOrder);
router.get("/", authMiddleware, controller.getOrders);
router.get("/:id", authMiddleware, controller.getById);
router.put("/:id/status", authMiddleware, controller.updateOrderStatus);
router.delete("/:id", authMiddleware, controller.deleteOrder);

module.exports = router;