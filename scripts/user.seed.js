const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

// async function updatePasswords() {
//   try {
//     console.log("Updating passwords...");

//     const hashedPassword = await bcrypt.hash("123456", 10);

//     await prisma.user.updateMany({
//       data: {
//         password: hashedPassword,
//       },
//     });

//     console.log("All users updated with hashed password!");
//   } catch (err) {
//     console.error("Error:", err);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// updatePasswords();

// function generateUsers(count = 1000) {
//   const users = [];

//   for (let i = 1; i <= count; i++) {
//     users.push({
//       name: faker.person.fullName(),
//       email: faker.internet.email().toLowerCase(),
//       role: i === 1 ? "admin" : "user", 
//       status: faker.datatype.boolean(),
//     });
//   }

//   return users;
// }

// async function main() {
//   try {
//     console.log("Generating users...");

//     const users = generateUsers(1000);

//     await prisma.user.createMany({
//       data: users,
//       skipDuplicates: true,
//     });

//     console.log("Users inserted successfully!");
//   } catch (err) {
//     console.error("Error:", err);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main();