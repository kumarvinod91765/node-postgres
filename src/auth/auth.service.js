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

exports.changePassword = async (userId, { currentPassword, newPassword, confirmPassword }) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  if (!newPassword || !confirmPassword) {
    throw new Error("New password and confirmation are required");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("New passwords do not match");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: Number(userId) },
    data: { password: hashedNewPassword },
  });

  return { success: true, message: "Password changed successfully" };
};
