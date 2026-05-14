import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const [products, categories] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
  ]);
  console.log(`✅ Connected — ${products} products, ${categories} categories`);
}

main()
  .catch((e) => { console.error("❌ Connection failed:", e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
