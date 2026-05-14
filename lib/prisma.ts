import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL ?? "";
  if (!url.includes("connection_limit")) {
    const sep = url.includes("?") ? "&" : "?";
    // Serverless (Vercel) spins a new process per invocation — 1 connection is enough.
    // Local dev benefits from a slightly larger pool.
    const limit = process.env.VERCEL ? 1 : 2;
    return `${url}${sep}connection_limit=${limit}&pool_timeout=20`;
  }
  return url;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    datasources: { db: { url: getDatabaseUrl() } },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

