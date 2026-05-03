# DB-backed catalog + inquiries Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace hardcoded `data/products.ts` and `data/categories.ts` with Postgres-backed data (via Prisma + Next.js API routes), and persist contact/inquiry submissions to the DB.

**Architecture:** Keep the backend inside the existing Next.js App Router using `app/api/**/route.ts` handlers. Frontend pages and components switch from importing `data/*` modules to fetching from `/api/*` (server-side in pages, client-side where needed). A one-time seed script imports the existing hardcoded catalog into the database for development.

**Tech Stack:** Next.js 14 App Router, Prisma, Postgres (Docker), TypeScript.

---

## Files that will be created/modified

**Create**
- `prisma/schema.prisma` (extend models)
- `app/api/products/route.ts`
- `app/api/products/[id]/route.ts`
- `app/api/categories/route.ts`
- `app/api/inquiries/route.ts`
- `app/api/seed/route.ts` (dev-only trigger, optional but convenient)
- `lib/validators.ts` (minimal input validation helpers)

**Modify**
- `data/products.ts` (keep temporarily for seeding only; stop importing from UI)
- `data/categories.ts` (keep temporarily for seeding only; stop importing from UI)
- `app/(site)/products/page.tsx`
- `app/(site)/products/[id]/page.tsx`
- `app/(site)/products/by-instrument-type/page.tsx`
- `app/(site)/products/by-instrument-type/[slug]/page.tsx`
- `app/(site)/products/by-instrument-type/[slug]/[subslug]/page.tsx`
- `app/(site)/products/by-surgery-type/page.tsx`
- `app/(site)/products/by-surgery-type/[slug]/page.tsx`
- `app/(site)/contact/page.tsx`

**Config already present**
- `docker-compose.yml` (Postgres on host port `5433`)
- `.env` (`DATABASE_URL=...127.0.0.1:5433...`)

---

## Task 1: Extend Prisma schema with catalog + inquiries

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Update `schema.prisma` models (no compliance fields)**

Add enums + models below (keep existing `User` model as-is for now):

```prisma
enum CategoryType {
  INSTRUMENT
  SURGERY
}

enum InquiryType {
  CONTACT
  QUOTE
}

enum InquiryStatus {
  NEW
  IN_PROGRESS
  CLOSED
}

model Product {
  id               String            @id @default(cuid())
  name             String
  productCode      String            @unique
  shortDescription String?
  description      String
  featured         Boolean           @default(false)
  inStock          Boolean           @default(true)
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt

  images           ProductImage[]
  specs            ProductSpec[]
  categories       ProductCategory[]
  inquiryItems     InquiryItem[]
}

model ProductImage {
  id        String  @id @default(cuid())
  productId String
  url       String
  alt       String?
  sortOrder Int     @default(0)

  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([productId])
  @@index([productId, sortOrder])
}

model ProductSpec {
  id        String  @id @default(cuid())
  productId String
  key       String
  value     String

  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([productId])
  @@unique([productId, key])
}

model Category {
  id          String       @id @default(cuid())
  type        CategoryType
  name        String
  slug        String
  description String?
  parentId    String?

  parent      Category?    @relation("CategoryHierarchy", fields: [parentId], references: [id], onDelete: SetNull)
  children    Category[]   @relation("CategoryHierarchy")

  products    ProductCategory[]

  @@index([type])
  @@index([parentId])
  @@unique([type, slug])
}

model ProductCategory {
  productId  String
  categoryId String

  product    Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@id([productId, categoryId])
  @@index([categoryId])
}

model Inquiry {
  id          String        @id @default(cuid())
  type        InquiryType   @default(CONTACT)
  status      InquiryStatus @default(NEW)

  name        String
  email       String
  phone       String?
  company     String?
  subject     String?
  message     String

  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  items       InquiryItem[]
  attachments InquiryAttachment[]
}

model InquiryItem {
  id                  String   @id @default(cuid())
  inquiryId           String
  productId           String?
  productCodeSnapshot String?
  productNameSnapshot String?
  quantity            Int
  notes               String?

  inquiry             Inquiry  @relation(fields: [inquiryId], references: [id], onDelete: Cascade)
  product             Product? @relation(fields: [productId], references: [id], onDelete: SetNull)

  @@index([inquiryId])
  @@index([productId])
}

model InquiryAttachment {
  id        String  @id @default(cuid())
  inquiryId String
  fileName  String
  mimeType  String?
  size      Int?
  url       String

  inquiry   Inquiry @relation(fields: [inquiryId], references: [id], onDelete: Cascade)

  @@index([inquiryId])
}
```

- [ ] **Step 2: Generate migration**

Run:
- `npm run prisma:generate`
- `npx prisma migrate dev --name catalog_inquiries`

Expected:
- Migration folder created in `prisma/migrations/*_catalog_inquiries/`
- Prisma prints “Your database is now in sync with your schema.”

- [ ] **Step 3: Sanity check DB connectivity**

Run:
- `curl -sS http://localhost:3000/api/health`
Expected:
- `{"ok":true,"db":"up"}`

---

## Task 2: Create API routes for categories and products

**Files:**
- Create: `app/api/categories/route.ts`
- Create: `app/api/products/route.ts`
- Create: `app/api/products/[id]/route.ts`
- Create: `lib/validators.ts`

- [ ] **Step 1: Add minimal validators**

Create `lib/validators.ts`:

```ts
export function requiredString(value: unknown, field: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid ${field}`);
  }
  return value.trim();
}

export function optionalString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

export function requiredInt(value: unknown, field: string) {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(n)) throw new Error(`Invalid ${field}`);
  return n;
}
```

- [ ] **Step 2: Implement `GET /api/categories`**

Create `app/api/categories/route.ts`:

```ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type"); // INSTRUMENT | SURGERY | null

  const where =
    type === "INSTRUMENT" || type === "SURGERY" ? { type } : undefined;

  const categories = await prisma.category.findMany({
    where,
    orderBy: [{ type: "asc" }, { name: "asc" }],
  });

  return NextResponse.json({ categories });
}
```

- [ ] **Step 3: Implement `GET /api/products` (with optional filters)**

Create `app/api/products/route.ts`:

```ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const categoryType = url.searchParams.get("categoryType"); // INSTRUMENT|SURGERY
  const categorySlug = url.searchParams.get("categorySlug");
  const q = url.searchParams.get("q");

  const where: any = {};

  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { productCode: { contains: q, mode: "insensitive" } },
    ];
  }

  if (
    categorySlug &&
    (categoryType === "INSTRUMENT" || categoryType === "SURGERY")
  ) {
    where.categories = {
      some: { category: { type: categoryType, slug: categorySlug } },
    };
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: [{ featured: "desc" }, { name: "asc" }],
    include: {
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
    },
  });

  return NextResponse.json({ products });
}
```

- [ ] **Step 4: Implement `GET /api/products/:id` (detail)**

Create `app/api/products/[id]/route.ts`:

```ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      specs: { orderBy: { key: "asc" } },
      categories: { include: { category: true } },
    },
  });

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ product });
}
```

- [ ] **Step 5: Quick manual checks**

Run:
- `curl -sS "http://localhost:3000/api/categories" | jq .`
- `curl -sS "http://localhost:3000/api/products" | jq .`

Expected:
- Valid JSON; arrays are empty until seeded.

---

## Task 3: Seed DB from existing hardcoded data (dev only)

**Files:**
- Create: `app/api/seed/route.ts`
- Read from: `data/products.ts`, `data/categories.ts`

- [ ] **Step 1: Implement a dev-only seed route**

Create `app/api/seed/route.ts`:

```ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sampleProducts } from "@/data/products";
import { instrumentTypeCategories, surgeryTypeCategories } from "@/data/categories";

export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  // Create categories (parents + children)
  async function upsertCategoryTree(type: "INSTRUMENT" | "SURGERY", cats: any[]) {
    for (const c of cats) {
      const parent = await prisma.category.upsert({
        where: { type_slug: { type, slug: c.slug } } as any,
        update: { name: c.name, description: c.description ?? null, parentId: null },
        create: { type, slug: c.slug, name: c.name, description: c.description ?? null },
      });

      if (Array.isArray(c.subcategories)) {
        for (const s of c.subcategories) {
          await prisma.category.upsert({
            where: { type_slug: { type, slug: s.slug } } as any,
            update: { name: s.name, description: s.description ?? null, parentId: parent.id },
            create: {
              type,
              slug: s.slug,
              name: s.name,
              description: s.description ?? null,
              parentId: parent.id,
            },
          });
        }
      }
    }
  }

  // NOTE: this assumes you add @@unique([type, slug]) in Category (already planned),
  // but Prisma needs a named unique constraint helper in TS. We'll instead findFirst.
  // Implementation can be adjusted during execution.

  // For now, wipe and re-seed (dev only).
  await prisma.productCategory.deleteMany();
  await prisma.productSpec.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Recreate categories
  for (const list of [
    { type: "INSTRUMENT" as const, cats: instrumentTypeCategories },
    { type: "SURGERY" as const, cats: surgeryTypeCategories },
  ]) {
    for (const c of list.cats as any[]) {
      const parent = await prisma.category.create({
        data: {
          type: list.type,
          name: c.name,
          slug: c.slug,
          description: c.description ?? null,
        },
      });

      if (Array.isArray(c.subcategories)) {
        for (const s of c.subcategories) {
          await prisma.category.create({
            data: {
              type: list.type,
              name: s.name,
              slug: s.slug,
              description: s.description ?? null,
              parentId: parent.id,
            },
          });
        }
      }
    }
  }

  // Build a slug->categoryId map for linking
  const categories = await prisma.category.findMany();
  const categoryBySlugType = new Map(categories.map((c) => [`${c.type}:${c.slug}`, c.id]));

  // Seed products
  for (const p of sampleProducts as any[]) {
    const created = await prisma.product.create({
      data: {
        name: p.name,
        productCode: p.productCode,
        shortDescription: p.shortDescription ?? null,
        description: p.description,
        featured: !!p.featured,
        inStock: p.inStock !== false,
        images: {
          create: (p.images ?? []).map((url: string, idx: number) => ({
            url,
            sortOrder: idx,
          })),
        },
        specs: {
          create: Object.entries(p.specifications ?? {}).map(([key, value]) => ({
            key,
            value: String(value),
          })),
        },
      },
    });

    // Link categories: instrumentCategory/subCategory + surgeryTypes[]
    const links: string[] = [];
    if (p.category?.slug) links.push(`INSTRUMENT:${p.category.slug}`);
    if (p.subCategory?.slug) links.push(`INSTRUMENT:${p.subCategory.slug}`);
    if (Array.isArray(p.surgeryTypes)) {
      for (const s of p.surgeryTypes) links.push(`SURGERY:${String(s).toLowerCase().replace(/\\s+/g, "-")}`);
    }

    for (const key of links) {
      const categoryId = categoryBySlugType.get(key);
      if (!categoryId) continue;
      await prisma.productCategory.create({
        data: { productId: created.id, categoryId },
      });
    }
  }

  return NextResponse.json({ ok: true, products: sampleProducts.length, categories: categories.length });
}
```

- [ ] **Step 2: Adjust `Category` seed mapping to match your existing slugs**

During execution, ensure the surgery type slug mapping matches `data/categories.ts` slugs exactly (prefer linking by slug from that file, not “slugified strings”).

- [ ] **Step 3: Run seed**

Run:
- `curl -X POST -sS http://localhost:3000/api/seed | jq .`

Expected:
- `{ ok: true, products: <n>, categories: <n> }`

- [ ] **Step 4: Verify list endpoints return data**

Run:
- `curl -sS http://localhost:3000/api/products | jq '.products | length'`
- `curl -sS "http://localhost:3000/api/products?q=forceps" | jq '.products | length'`

---

## Task 4: Persist inquiries from contact page

**Files:**
- Create: `app/api/inquiries/route.ts`
- Modify: `app/(site)/contact/page.tsx`

- [ ] **Step 1: Create `POST /api/inquiries`**

Create `app/api/inquiries/route.ts`:

```ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { optionalString, requiredInt, requiredString } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = requiredString(body.name, "name");
    const email = requiredString(body.email, "email");
    const phone = optionalString(body.phone);
    const company = optionalString(body.company);
    const subject = optionalString(body.subject);
    const message = requiredString(body.message, "message");

    const type =
      body.type === "QUOTE" || body.type === "CONTACT" ? body.type : "CONTACT";

    const items = Array.isArray(body.items) ? body.items : [];
    const attachments = Array.isArray(body.attachments) ? body.attachments : [];

    const inquiry = await prisma.inquiry.create({
      data: {
        type,
        name,
        email,
        phone,
        company,
        subject,
        message,
        items: {
          create: items.map((it: any) => ({
            productId: typeof it.productId === "string" ? it.productId : null,
            productCodeSnapshot: optionalString(it.productCode),
            productNameSnapshot: optionalString(it.productName),
            quantity: requiredInt(it.quantity, "quantity"),
            notes: optionalString(it.notes),
          })),
        },
        attachments: {
          create: attachments.map((a: any) => ({
            fileName: requiredString(a.fileName, "fileName"),
            mimeType: optionalString(a.mimeType),
            size: typeof a.size === "number" ? a.size : null,
            url: requiredString(a.url, "url"),
          })),
        },
      },
      include: { items: true, attachments: true },
    });

    return NextResponse.json({ inquiry });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Bad request" },
      { status: 400 },
    );
  }
}
```

- [ ] **Step 2: Update contact page to call `/api/inquiries`**

In `app/(site)/contact/page.tsx`, on form submit:
- Build payload from existing state (`formData`, `items` from inquiry cart, `files` list)
- For now: send attachments as metadata only (fileName/mimeType/size + placeholder url) OR skip attachments until upload endpoint is built.

Minimal payload example:

```ts
await fetch("/api/inquiries", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: items.length ? "QUOTE" : "CONTACT",
    ...formData,
    items: items.map((it) => ({
      productId: it.product.id,
      productCode: it.product.productCode,
      productName: it.product.name,
      quantity: it.quantity,
    })),
    attachments: [],
  }),
});
```

- [ ] **Step 3: Manual verification**

Run:
- Submit contact form in browser
- Or:

```bash
curl -sS -X POST http://localhost:3000/api/inquiries \
  -H 'content-type: application/json' \
  -d '{"type":"CONTACT","name":"Test","email":"test@example.com","message":"Hello","items":[],"attachments":[]}' | jq .
```

Expected:
- JSON includes created `inquiry.id`

---

## Task 5: Integrate DB catalog into frontend pages (replace `data/*` imports)

**Files:**
- Modify: `app/(site)/products/page.tsx`
- Modify: `app/(site)/products/[id]/page.tsx`
- Modify: `app/(site)/products/by-*/**`

- [ ] **Step 1: Replace product listing data source**

In server components (pages), replace:
- `import { ... } from "@/data/products"`

With:
- `await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/api/products`, { cache: "no-store" })`

Prefer using relative fetch in server components:

```ts
const res = await fetch(`${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/api/products`, { cache: "no-store" });
const { products } = await res.json();
```

Or switch to `prisma` calls directly in server components for best performance (optional).

- [ ] **Step 2: Replace product detail data source**

In `products/[id]/page.tsx`, replace `getProductById` with:
- `await fetch(/api/products/:id)` and map API response into the UI’s expected shape.

If the UI expects `specifications` as an object, build it from `ProductSpec[]`:

```ts
const specifications = Object.fromEntries(product.specs.map((s) => [s.key, s.value]));
```

- [ ] **Step 3: Replace category pages data source**

For instrument/surgery pages:
- Fetch categories from `/api/categories?type=INSTRUMENT` or `SURGERY`
- Fetch products filtered with `/api/products?categoryType=INSTRUMENT&categorySlug=<slug>`

- [ ] **Step 4: Verify pages render**

Manually visit:
- `/products`
- `/products/<someProductIdFromAPI>`
- `/products/by-instrument-type/...`

Expected:
- Same UI, now backed by DB.

---

## Task 6: Cleanup + docs

**Files:**
- Modify: `README.md` (optional)

- [ ] **Step 1: Document local dev**

Add to README:
- Start DB: `docker compose up -d`
- Seed DB: `curl -X POST http://localhost:3000/api/seed`
- Run app: `npm run dev`

- [ ] **Step 2: Keep `data/*` only for seed (or remove later)**

After integration is stable, either:
- keep `data/*` as seed-only dev fixtures, or
- delete them once you have admin UI/import tooling.

---

## Self-review checklist

- Spec coverage: products/images/specs/categories/inquiries implemented; compliance not modeled.
- No placeholders: all endpoints and fields defined; seed route included for dev.
- Type consistency: CategoryType/InquiryType/InquiryStatus enums align across schema + routes.

