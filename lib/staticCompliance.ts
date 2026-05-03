import type { Product } from "@/types/product";

/**
 * Compliance is intentionally static in the UI (not stored in DB).
 * Keep a single default so list/detail cards still render consistently.
 */
export const DEFAULT_COMPLIANCE: Product["compliance"] = {
  iso: ["ISO 13485", "ISO 9001"],
  ce: true,
  mdr: true,
  fda: false,
};
