# Backend DB design (Next.js + Prisma + Postgres)

## Goal

Move currently hardcoded frontend content into a database-backed backend inside the existing Next.js app (App Router), while keeping compliance badges/certifications static (not stored in DB).

Scope for this iteration:

- Products (equipment) + images + specifications
- Categories + subcategories for instrument type and surgery type
- Inquiries / contact messages + inquiry items + attachments metadata

Out of scope:

- Compliance fields (CE/MDR/FDA/ISO) remain static in frontend code
- Full auth implementation (UI exists; backend can be added later)
- Full blog/CMS (can be added later)

## Constraints / assumptions

- Use Postgres locally (Docker) with Prisma ORM.
- Products can belong to **multiple categories** (user-approved).
- Categories support hierarchy (parent/child) and are typed as instrument vs surgery.
- Product specifications are dynamic key/value pairs (to match current UI rendering).

## Data model (Prisma entities)

### Product

- `id` (cuid/uuid)
- `name`
- `productCode` (unique)
- `shortDescription` (nullable)
- `description`
- `featured` (bool)
- `inStock` (bool)
- timestamps
- relations:
  - many `ProductImage`
  - many `ProductSpec`
  - many-to-many `Category` through `ProductCategory`

### ProductImage

- `id`
- `productId`
- `url`
- `alt` (nullable)
- `sortOrder` (int)

### ProductSpec

- `id`
- `productId`
- `key`
- `value`
- unique constraint `(productId, key)` (optional; prevents duplicate keys)

### Category

- `id`
- `type` enum: `INSTRUMENT | SURGERY`
- `name`
- `slug` (unique per type)
- `description` (nullable)
- `parentId` (nullable) for subcategories
- relations:
  - self-relation parent/children
  - many-to-many products through `ProductCategory`

### ProductCategory (join)

- `productId`
- `categoryId`
- unique constraint `(productId, categoryId)`

### Inquiry (contact/quote)

Stores submissions from the contact page and/or inquiry cart checkout.

- `id`
- `type` enum: `CONTACT | QUOTE`
- `status` enum: `NEW | IN_PROGRESS | CLOSED` (expand later)
- `name`, `email`, `phone`, `company`, `subject`, `message`
- timestamps
- relations:
  - many `InquiryItem`
  - many `InquiryAttachment`

### InquiryItem

- `id`
- `inquiryId`
- `productId` (nullable) — allows items even if product later deleted
- `productCodeSnapshot`, `productNameSnapshot` (store what user saw)
- `quantity`
- `notes` (nullable)

### InquiryAttachment

- `id`
- `inquiryId`
- `fileName`
- `mimeType`
- `size`
- `url` (or `path`) — initial version stores metadata only; actual upload handling can follow

## API surface (first slice)

- `GET /api/products` (list + filters by category slug/type)
- `GET /api/products/:id` (detail)
- `GET /api/categories?type=INSTRUMENT|SURGERY` (tree or flat)
- `POST /api/inquiries` (create inquiry with items + attachments metadata)
- Keep existing `GET /api/health` for DB connectivity checks

## Error handling expectations

- Return `400` on validation errors (missing required fields, invalid enum values)
- Return `404` for missing resources
- Return `500` for unexpected DB errors

## Success criteria

- Prisma schema reflects the models above (without compliance fields).
- Migration applies cleanly to local Postgres.
- `/api/health` continues to return `{ ok: true, db: "up" }`.
- Basic read APIs work for products/categories, and inquiry creation persists to DB.

