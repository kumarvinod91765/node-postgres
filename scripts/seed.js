const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

function generateUsers(count = 1000) {
  const users = [];

  for (let i = 1; i <= count; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      role: i === 1 ? "admin" : "user", // only 1 admin
      status: faker.datatype.boolean(),
    });
  }

  return users;
}

async function main() {
  try {
    console.log("🚀 Generating users...");

    const users = generateUsers(1000);

    await prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    });

    console.log("✅ Users inserted successfully!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();