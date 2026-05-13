import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

import { env } from '@/lib/env';

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const prismaClient = new PrismaClient({ adapter });

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
