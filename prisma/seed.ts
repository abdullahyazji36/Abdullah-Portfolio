import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
    adapter,
});

async function main() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        throw new Error(
            "Please define ADMIN_EMAIL and ADMIN_PASSWORD in .env"
        );
    }

    // const existingUser = await prisma.user.upsert({
    //     where: { email: process.env.ADMIN_EMAIL },
    // });

    // if (existingUser) {
    //     console.log("Admin already exists.");
    //     return;
    // }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.upsert({
        where: {
            email,
        },
        update: {},
        create: {
            name: "Admin",
            email,
            password: hashedPassword,
        },
    });

    console.log("Admin user created successfully.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });