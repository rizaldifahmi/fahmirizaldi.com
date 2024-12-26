import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

async function main() {
  // Add your seed data here
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  }); 