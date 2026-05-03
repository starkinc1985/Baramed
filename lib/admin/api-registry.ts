/**
 * Registry of public/backend API routes for the admin "APIs" page.
 * Update this list when you add new routes.
 */
export type ApiRegistryEntry = {
  method: string;
  path: string;
  description: string;
};

export const adminApiRegistry: ApiRegistryEntry[] = [
  { method: "GET", path: "/api/health", description: "Database connectivity check" },
  { method: "GET", path: "/api/categories", description: "List categories (?type=INSTRUMENT|SURGERY)" },
  { method: "GET", path: "/api/products", description: "List products (filters: q, featured, categoryType, categorySlug, take)" },
  { method: "GET", path: "/api/products/[id]", description: "Product detail" },
  { method: "POST", path: "/api/inquiries", description: "Create contact / quote inquiry" },
  { method: "POST", path: "/api/seed", description: "Dev only — seed DB from static data" },
  { method: "POST", path: "/api/admin/auth/login", description: "Admin login" },
  { method: "POST", path: "/api/admin/auth/logout", description: "Admin logout" },
  { method: "GET", path: "/api/admin/auth/me", description: "Current admin session" },
  { method: "POST", path: "/api/admin/auth/bootstrap", description: "Create first admin (only when no users exist)" },
  { method: "POST", path: "/api/admin/users", description: "Create administrator (requires admin session)" },
];
