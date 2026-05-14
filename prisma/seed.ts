import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed a sample INSTRUMENT category
  const category = await prisma.category.upsert({
    where: { type_slug: { type: "INSTRUMENT", slug: "diagnostic" } },
    update: {},
    create: {
      type: "INSTRUMENT",
      name: "Diagnostic",
      slug: "diagnostic",
      description: "General diagnostic instruments",
    },
  });

  // Seed a sample product
  await prisma.product.upsert({
    where: { productCode: "SEED-001" },
    update: {},
    create: {
      name: "Sample Percussion Hammer",
      productCode: "SEED-001",
      description: "Taylor percussion hammer — 18 cm",
      shortDescription: "18 cm, 7\"",
      featured: false,
      inStock: true,
      categories: { create: [{ categoryId: category.id }] },
    },
  });

  console.log("✅ Seed complete");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
