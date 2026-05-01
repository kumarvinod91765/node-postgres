const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");
    const users = [];
    for (let i = 0; i < 1000; i++) {
        users.push({
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password(),
            role: "user",
            status: faker.datatype.boolean(),
        });
    }

    await prisma.user.createMany({
        data: users,
        skipDuplicates: true,
    });

    console.log("1000 Users created");

    //Create 500 Categories
    const categories = [];
    for (let i = 0; i < 500; i++) {
        categories.push({
            name: faker.commerce.department(),
            description: faker.commerce.productDescription(),
            status: faker.datatype.boolean(),
        });
    }

    await prisma.category.createMany({
        data: categories,
    });

    console.log("500 Categories created");

    console.log("Seeding completed!");
}

main()
    .catch((e) => {
        console.error("Error:", e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });