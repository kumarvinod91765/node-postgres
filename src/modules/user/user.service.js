const prisma = require("../../config/prisma");
const bcrypt = require("bcrypt");

exports.createUser = async ({ name, email, password, role }) => {
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
};

exports.getUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: {
        not: "Admin",
      },
    },
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
      password: undefined,
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

exports.getAdminProfile = async (role) => {
  const admin = await prisma.user.findFirst({
    where: { role: role },
  });

  return {
    message: "Admin profile get successfully.",
    data: admin,
  };
};
