const prisma = require("../../config/prisma");
const error = require("../../utils/response").error;

exports.createCategory = async ({ name, description }) => {
  try {
    const category = await prisma.category.create({
        data: {
            name,
            description,
        },
    });
    return category;
  } catch (error) {
    throw error;
  }
};

exports.getCategories = async () => {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  return categories;
};

exports.getById = async (id) => {
  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
  });
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};

exports.updateCategory = async (id, data) => {
  const category = await prisma.category.update({
    where: { id: Number(id) },
    data,
  });
  return category;
}

exports.deleteCategory = async (id) => {
  await prisma.category.delete({
    where: { id: Number(id) },
    });
    return { success: true, message: "Category deleted successfully" };
};