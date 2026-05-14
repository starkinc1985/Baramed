import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function makePrisma(): PrismaClient {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Serverless (Vercel): 1 connection per invocation is enough.
    // Local dev: small pool to avoid exhausting the free-tier limit.
    max: process.env.VERCEL ? 1 : 5,
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? makePrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
