const prisma = require("../../config/prisma");
const error = require("../../utils/response").error;

exports.createProduct = async ({ name, price, stock, status, categoryId }) => {
    try {
        const product = await prisma.product.create({
            data: {
                name,
                price,
                stock,
                status: true,
                categoryId,
            },
        });
        return product;
    }
    catch (error) {
        throw error;
    }
};

exports.getProducts = async () => {
    const products = await prisma.product.findMany({
        include: {
            category: {
                select: { name: true },
            },
        },
    });

    return products.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        stock: p.stock,
        status: p.status,
        category: p.category.name,
        createdAt: p.createdAt,
    }));
};

exports.getById = async (id) => {
    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
    });
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};

exports.updateProduct = async (id, data) => {
    const product = await prisma.product.update({
        where: { id: Number(id) },
        data,
    });
    return product;
};

exports.deleteProduct = async (id) => {
    await prisma.product.delete({
        where: { id: Number(id) },
    });
    return { success: true, message: "Product deleted successfully" };
};