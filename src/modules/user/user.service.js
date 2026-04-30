const prisma = require("../../config/prisma");
const error = require("../../utils/response").error;

exports.createUser = async ({ name, email, role, status }) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        status: true,
      },
    });

    if(existEmail) {
      throw new Error("Email already exists");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

exports.getUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: {
        not: "Admin"
      }
    }
  });
  return users;
};

exports.getById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });

  return user;
};

exports.updateUser = async (id, data) => {
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data,
  });
  return user;
};

exports.deleteUser = async (id) => {
  await prisma.user.delete({
    where: { id: Number(id) },
  });
  return { message: "User deleted successfully" };
};