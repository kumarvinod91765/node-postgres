const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");
const error = require("../utils/response").error;

exports.login = async ({ email, password }) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email, role: "Admin" },
    });

    if (!user || user.password !== password) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    return { token };
  } catch (error) {
    throw error;
  }
};