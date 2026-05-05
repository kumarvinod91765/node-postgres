const service = require("./order.service");
const error = require("../../utils/response").error;

exports.createOrder = async (req, res, next) => {
    try {
        const { items, userId } = req.body;

        const order = await service.createOrder({
            userId,
            items,
        });

        res.status(201).json(order);
    } catch (err) {
        next(err);
    }
};

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await service.getOrders();
        res.json(orders);
    } catch (err) {
        next(err);
    }
};

exports.getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const order = await service.getById(id);

        res.json(order);
    } catch (err) {
        next(err);
    }
};

exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await service.updateOrderStatus(id, status);

        res.json(order);
    } catch (err) {
        next(err);
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await service.deleteOrder(id);

        res.json(result);
    } catch (err) {
        next(err);
    }
};