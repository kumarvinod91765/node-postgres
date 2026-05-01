const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");
  const USER_COUNT = 1000;
  const CATEGORY_COUNT = 500;

  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const users = [];
  for (let i = 0; i < USER_COUNT; i++) {
    users.push({
      name: faker.person.fullName(),
      email: `user${i}@test.com`,
      password: faker.internet.password(),
      role: "user",
      status: faker.datatype.boolean(),
    });
  }

  const userResult = await prisma.user.createMany({
    data: users,
  });

  console.log("Users created:", userResult.count);

  const categories = [];
  for (let i = 0; i < CATEGORY_COUNT; i++) {
    categories.push({
      name: `Category ${i}`,
      description: faker.commerce.productDescription(),
      status: faker.datatype.boolean(),
    });
  }

  const categoryResult = await prisma.category.createMany({
    data: categories,
  });

  console.log("Categories created:", categoryResult.count);

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error("Error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });