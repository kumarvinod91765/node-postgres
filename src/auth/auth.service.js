const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email, role: "Admin" },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "10h",
  });

  return { token };
};
