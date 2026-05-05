const prisma = require("../../config/prisma");
const error = require("../../utils/response").error;

exports.createOrder = async ({ userId, items }) => {
    try {
        let totalPrice = 0;

        for (const item of items) {
            const product = await prisma.product.findUnique({
                where: { id: item.productId },
            });

            if (!product) {
                throw new Error(`Product not found: ${item.productId}`);
            }

            if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for product ${item.productId}`);
            }

            totalPrice += Number(product.price) * item.quantity;
        }

        const order = await prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    totalPrice,
                },
            });

            for (const item of items) {
                const product = await tx.product.findUnique({
                    where: { id: item.productId },
                });

                await tx.orderItem.create({
                    data: {
                        orderId: newOrder.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        price: product.price,
                    },
                });

                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });
            }

            return newOrder;
        });

        return order;
    } catch (err) {
        throw err;
    }
};

exports.getOrders = async () => {
    const orders = await prisma.order.findMany({
        include: {
            user: {
                select: { id: true, name: true, email: true },
            },
            items: {
                include: {
                    product: {
                        select: { name: true },
                    },
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    return orders.map(o => ({
        id: o.id,
        user: o.user,
        totalPrice: o.totalPrice,
        status: o.status,
        createdAt: o.createdAt,
        items: o.items.map(i => ({
            productId: i.productId,
            productName: i.product.name,
            quantity: i.quantity,
            price: i.price,
        })),
    }));
};

exports.getById = async (id) => {
    const order = await prisma.order.findUnique({
        where: { id: Number(id) },
        include: {
            user: true,
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    if (!order) {
        throw new Error("Order not found");
    }

    return order;
};

exports.updateOrderStatus = async (id, status) => {
    const validStatus = ["PENDING", "PAID", "SHIPPED", "COMPLETED", "CANCELLED"];

    if (!validStatus.includes(status)) {
        throw new Error("Invalid status");
    }

    const order = await prisma.order.update({
        where: { id: Number(id) },
        data: { status },
    });

    return order;
};

exports.deleteOrder = async (id) => {
    await prisma.order.delete({
        where: { id: Number(id) },
    });

    return {
        success: true,
        message: "Order deleted successfully",
    };
};