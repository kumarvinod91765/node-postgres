const prisma = require("../../config/prisma");

exports.createCategory = async ({ name, description }) => {
  const category = await prisma.category.create({
    data: {
      name,
      description,
    },
  });
  return category;
};

exports.getCategories = async () => {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      createdAt: true,
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
};

exports.deleteCategory = async (id) => {
  await prisma.category.delete({
    where: { id: Number(id) },
  });
  return { success: true, message: "Category deleted successfully" };
};
