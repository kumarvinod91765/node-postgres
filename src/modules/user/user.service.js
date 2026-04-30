const prisma = require("../../config/prisma");

exports.createUser = async ({ name, email, role, status }) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        status: true,
      },
    });

    return user;
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("Email already exists");
    }
    throw error;
  }
};

exports.getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};