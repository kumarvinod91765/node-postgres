const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const error = require("../utils/response").error;

exports.login = async ({ email, password }) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email, role: "Admin" },
    });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
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