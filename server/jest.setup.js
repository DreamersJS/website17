import 'dotenv/config';
// dotenv.config({ path: '.env.test' });
process.env.NODE_ENV = 'test';
import prisma from './src/config/prisma.js';

export async function cleanDb() {
    const dbName = await prisma.$queryRaw`SELECT current_database()`;
    const result = await prisma.$queryRaw`
  SELECT current_database(), inet_server_addr(), inet_server_port()
`
    console.log(result)
    if (process.env.NODE_ENV !== 'test') {
        throw new Error('cleanDb() called outside test environment');
    }
    if (process.env.NODE_ENV === 'test') {
        if (!process.env.TEST_DATABASE_URL.includes('5433')) {
            throw new Error('Tests must use test DB on port 5433');
        }
    }
    if (!dbName[0].current_database.includes('test')) {
        throw new Error('Not connected to test database');
    }
    const tablenames = await prisma.$queryRaw`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `;
    for (const { tablename } of tablenames) {
        if (tablename !== '_prisma_migrations') {
            await prisma.$executeRawUnsafe(
                `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
            );
        }
    }
}

beforeEach(async () => {
    await cleanDb();
});

afterAll(async () => {
    await prisma.$disconnect();
});