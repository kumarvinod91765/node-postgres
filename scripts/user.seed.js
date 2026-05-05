const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

// async function main() {
//     console.log("🌱 Seeding 200 orders...");

//     // Get existing users & products
//     const users = await prisma.user.findMany();
//     const products = await prisma.product.findMany();

//     if (!users.length || !products.length) {
//         throw new Error("Users or Products not found. Seed them first.");
//     }

//     for (let i = 0; i < 200; i++) {
//         const randomUser = faker.helpers.arrayElement(users);

//         // Random number of items (1–5)
//         const itemCount = faker.number.int({ min: 1, max: 5 });

//         let totalPrice = 0;
//         const itemsData = [];

//         for (let j = 0; j < itemCount; j++) {
//             const product = faker.helpers.arrayElement(products);
//             const quantity = faker.number.int({ min: 1, max: 3 });

//             const price = Number(product.price);
//             totalPrice += price * quantity;

//             itemsData.push({
//                 productId: product.id,
//                 quantity,
//                 price,
//             });
//         }

//         // Create Order with items (transaction)
//         await prisma.$transaction(async (tx) => {
//             const order = await tx.order.create({
//                 data: {
//                     userId: randomUser.id,
//                     totalPrice,
//                     status: faker.helpers.arrayElement([
//                         "PENDING",
//                         "PAID",
//                         "SHIPPED",
//                         "COMPLETED",
//                         "CANCELLED",
//                     ]),
//                 },
//             });

//             for (const item of itemsData) {
//                 await tx.orderItem.create({
//                     data: {
//                         orderId: order.id,
//                         productId: item.productId,
//                         quantity: item.quantity,
//                         price: item.price,
//                     },
//                 });
//             }
//         });

//         if (i % 20 === 0) {
//             console.log(`✅ Created ${i} orders`);
//         }
//     }

//     console.log("🎉 200 orders seeded successfully!");
// }

// main()
//     .catch((e) => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });