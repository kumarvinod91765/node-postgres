const prisma = require("../../config/prisma");
const error = require("../../utils/response").error;
const bcrypt = require("bcrypt");

exports.createUser = async ({ name, email, password, role, status }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        status: true,
      },
    });

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
    data: {
      ...data,
      password: undefined 
    },
  });
  return user;
};

exports.deleteUser = async (id) => {
  await prisma.user.delete({
    where: { id: Number(id) },
  });
  return { message: "User deleted successfully" };
};