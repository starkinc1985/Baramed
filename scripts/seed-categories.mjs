// Run with: node scripts/seed-categories.mjs
import mongoose from "mongoose";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env manually
const envPath = join(__dirname, "../.env");
const envLines = readFileSync(envPath, "utf8").split("\n");
for (const line of envLines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  const key = trimmed.slice(0, eq).trim();
  const val = trimmed.slice(eq + 1).trim();
  if (!process.env[key]) process.env[key] = val;
}

const MONGODB_URI = process.env.DATABASE_URL;
if (!MONGODB_URI || !MONGODB_URI.startsWith("mongodb")) {
  console.error("No valid MongoDB DATABASE_URL found in .env");
  process.exit(1);
}

// ── All 52 instrument categories from Instruments_Categorized_project.xlsx ──
const INSTRUMENT_CATEGORIES = [
  "Bone Plates",
  "Bowls & Basins",
  "Brushes",
  "Cannulas & Tubes",
  "Chisels, Gouges & Osteotomes",
  "Clamps",
  "Conductors & Guides",
  "Cotton Applicators",
  "Curettes & Scoops",
  "Depressors",
  "Dermatomes",
  "Dilators",
  "Dissectors",
  "Drills & Reamers",
  "Elevators & Levers",
  "Files & Rasps",
  "Forceps",
  "Hooks",
  "Intramedullary Nails & Pins",
  "Knives & Scalpels",
  "Mallets & Hammers",
  "Micro Instruments (set)",
  "Mirrors",
  "Mouth Gags",
  "Needle Holders",
  "Obstetric Instruments",
  "Other / Accessory",
  "Pelvimeters & Measuring",
  "Probes & Sounds",
  "Retractors",
  "Rongeurs & Punches",
  "Safety Pins",
  "Saws",
  "Scissors",
  "Scopes (Oto/Laryngo)",
  "Screwdrivers",
  "Screws",
  "Spatulas",
  "Speculums",
  "Sterilizing Drums & Boxes",
  "Stethoscopes",
  "Suture Needles",
  "Tendon Strippers",
  "Tongs",
  "Tongue Depressors",
  "Towel Clamps",
  "Trays & Lids",
  "Trocars",
  "Tuning Forks",
  "Vein Strippers",
  "Wire Cutters",
  "Wire Tighteners & Traction",
];

// ── All 13 surgery types from Instruments_Categorized_project.xlsx ──
const SURGERY_TYPES = [
  "Cardiothoracic / Vascular",
  "Dental / Oral",
  "Dermatology / Manicure",
  "Diagnostic / Neurology",
  "ENT (Ear, Nose, Throat)",
  "General Surgery",
  "Gynecology / Obstetrics",
  "Microsurgery / Plastic",
  "Neurosurgery",
  "Ophthalmic / Eye",
  "Orthopedic / Bone",
  "Sterilization & Nursing",
  "Urology / Hepatobiliary",
];

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const CategorySchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["INSTRUMENT", "SURGERY"], required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
  },
  { timestamps: true },
);
CategorySchema.index({ type: 1, slug: 1 }, { unique: true });

const Category =
  mongoose.models.Category ?? mongoose.model("Category", CategorySchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB\n");

  // ── Instrument categories ──
  const existingInstrument = await Category.find({ type: "INSTRUMENT" }).lean();
  const existingInstrumentSlugs = new Set(existingInstrument.map((c) => c.slug));

  console.log(`Instrument categories in DB:  ${existingInstrument.length}`);
  console.log(`Instrument categories in file: ${INSTRUMENT_CATEGORIES.length}`);

  const missingInstrument = INSTRUMENT_CATEGORIES.filter(
    (name) => !existingInstrumentSlugs.has(toSlug(name)),
  );

  if (missingInstrument.length > 0) {
    console.log(`\nAdding ${missingInstrument.length} missing instrument categories:`);
    for (const name of missingInstrument) {
      console.log("  +", name);
    }
    await Category.insertMany(
      missingInstrument.map((name) => ({ type: "INSTRUMENT", name, slug: toSlug(name) })),
      { ordered: false },
    ).catch((e) => console.warn("  (some may have been duplicates):", e.message));
  } else {
    console.log("  All instrument categories already present.");
  }

  // ── Surgery types ──
  const existingSurgery = await Category.find({ type: "SURGERY" }).lean();
  const existingSurgerySlugs = new Set(existingSurgery.map((c) => c.slug));

  console.log(`\nSurgery types in DB:  ${existingSurgery.length}`);
  console.log(`Surgery types in file: ${SURGERY_TYPES.length}`);

  const missingSurgery = SURGERY_TYPES.filter(
    (name) => !existingSurgerySlugs.has(toSlug(name)),
  );

  if (missingSurgery.length > 0) {
    console.log(`\nAdding ${missingSurgery.length} missing surgery types:`);
    for (const name of missingSurgery) {
      console.log("  +", name);
    }
    await Category.insertMany(
      missingSurgery.map((name) => ({ type: "SURGERY", name, slug: toSlug(name) })),
      { ordered: false },
    ).catch((e) => console.warn("  (some may have been duplicates):", e.message));
  } else {
    console.log("  All surgery types already present.");
  }

  // ── Final counts ──
  const finalInstrument = await Category.countDocuments({ type: "INSTRUMENT" });
  const finalSurgery = await Category.countDocuments({ type: "SURGERY" });
  console.log(`\n✔ Done. DB now has ${finalInstrument} instrument categories, ${finalSurgery} surgery types.`);

  await mongoose.disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
