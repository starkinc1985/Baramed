// ─────────────────────────────────────────────────────────────────────────────
// BÄRAMED CHATBOT DATA
// Edit this file to customise every answer, keyword, and quick-reply button.
// ─────────────────────────────────────────────────────────────────────────────

export type QA = {
  id: string;
  /** Words/phrases that trigger this answer */
  keywords: string[];
  /** Short label shown as a suggestion chip */
  label: string;
  /** Full answer shown in the chat bubble (supports \n for line breaks) */
  answer: string;
  /** Optional CTA buttons shown below the answer */
  links?: { label: string; href: string }[];
};

// ── Quick-reply buttons shown on first open ──────────────────────────────────
export const quickReplies: { id: string; label: string; icon: string }[] = [
  { id: "products",        label: "Browse Products",   icon: "🔬" },
  { id: "certifications",  label: "Certifications",    icon: "✅" },
  { id: "quote",           label: "Request a Quote",   icon: "📋" },
  { id: "manufacturing",   label: "Manufacturing",     icon: "🏭" },
  { id: "materials",       label: "Materials",         icon: "⚙️" },
  { id: "shipping",        label: "Shipping & Orders", icon: "📦" },
];

// ── Q&A database ─────────────────────────────────────────────────────────────
export const qaDatabase: QA[] = [
  // ── Products ────────────────────────────────────────────────────────────
  {
    id: "products",
    keywords: ["product", "instrument", "catalogue", "catalog", "browse", "find", "list", "what", "offer", "sell", "have"],
    label: "Browse Products",
    answer:
      "We manufacture a wide range of precision surgical instruments:\n\n• Scissors (Mayo, Metzenbaum, Iris, and more)\n• Forceps & Clamps (Hemostatic, Tissue, Bone)\n• Needle Holders (Mayo-Hegar, Castroviejo)\n• Retractors (Langenbeck, Deaver, Self-retaining)\n• Orthopedic & ENT Instruments\n• Gynecology & Neurosurgery Sets\n• Suction Instruments & Probes\n\nAll instruments are made in Germany and are CE marked.",
    links: [
      { label: "View All Products", href: "/products" },
      { label: "By Instrument Type", href: "/products/by-instrument-type" },
      { label: "By Surgery Type", href: "/products/by-surgery-type" },
    ],
  },

  // ── Certifications ──────────────────────────────────────────────────────
  {
    id: "certifications",
    keywords: ["certif", "iso", "13485", "ce", "mdr", "fda", "gmp", "compliance", "compliant", "standard", "quality", "approved", "regulation"],
    label: "Certifications",
    answer:
      "Bäramed holds the following certifications:\n\n✅ ISO 13485 — Medical Devices Quality Management System\n✅ ISO 9001 — Quality Management\n✅ CE Marking — EU conformity\n✅ MDR Compliant — EU Medical Device Regulation 2017/745\n✅ FDA Registered — US market access\n✅ GMP — Good Manufacturing Practice\n\nAll certificates are available for download on our Quality & Compliance page.",
    links: [
      { label: "Quality & Compliance", href: "/quality-compliance" },
      { label: "Download Certificates", href: "/downloads" },
    ],
  },

  // ── Quote / Ordering ────────────────────────────────────────────────────
  {
    id: "quote",
    keywords: ["quote", "price", "pricing", "cost", "order", "buy", "purchase", "request", "inquiry", "enquiry", "bulk", "wholesale", "minimum", "moq"],
    label: "Request a Quote",
    answer:
      "We work with hospitals, distributors, and procurement teams worldwide. To get a quote:\n\n1. Browse our catalogue and note product codes\n2. Submit a quote request via our Contact page\n3. Our sales team responds within 1 business day\n\nWe offer competitive pricing for bulk and repeat orders. Custom OEM/ODM pricing is also available.",
    links: [
      { label: "Request a Quote", href: "/contact" },
      { label: "Browse Products", href: "/products" },
    ],
  },

  // ── Manufacturing ───────────────────────────────────────────────────────
  {
    id: "manufacturing",
    keywords: ["manufactur", "made", "germany", "german", "factory", "production", "process", "craft", "precision", "cnc", "grinding", "facility"],
    label: "Manufacturing",
    answer:
      "All Bäramed instruments are manufactured in Germany using:\n\n🏭 Advanced CNC machining & precision grinding\n🔍 Multi-stage quality control at every step\n🧪 Material testing & dimensional verification\n✨ Hand-finishing for perfect surface quality\n\nWe combine traditional German craftsmanship with modern engineering to produce instruments that meet the highest surgical standards.",
    links: [
      { label: "About Our Manufacturing", href: "/about" },
    ],
  },

  // ── Materials ───────────────────────────────────────────────────────────
  {
    id: "materials",
    keywords: ["material", "steel", "stainless", "grade", "420", "440", "alloy", "metal", "rust", "corrosion", "durability"],
    label: "Materials",
    answer:
      "Our instruments are crafted from premium German stainless steel:\n\n⚙️ Grade 420 stainless steel — standard surgical use\n⚙️ Grade 440C stainless steel — high-hardness applications\n\nAll materials are fully biocompatible, corrosion-resistant, and designed to withstand repeated sterilization cycles (autoclave, EtO, gamma).",
  },

  // ── Sterilization ───────────────────────────────────────────────────────
  {
    id: "sterilization",
    keywords: ["steriliz", "sterilise", "autoclave", "eto", "gamma", "reusable", "single-use", "clean", "disinfect", "steri"],
    label: "Sterilization",
    answer:
      "All Bäramed reusable instruments are designed and tested for:\n\n♻️ Steam autoclave (134°C)\n♻️ Ethylene oxide (EtO)\n♻️ Gamma radiation\n\nSurfaces are passivated and mirror- or satin-finished to prevent biofilm accumulation. Detailed sterilization instructions (IFU) are available for download.",
    links: [
      { label: "Download IFU Documents", href: "/downloads" },
    ],
  },

  // ── Shipping ────────────────────────────────────────────────────────────
  {
    id: "shipping",
    keywords: ["ship", "deliver", "delivery", "dispatch", "lead time", "import", "export", "country", "worldwide", "global", "freight", "logistics"],
    label: "Shipping & Orders",
    answer:
      "We ship worldwide from Germany:\n\n🌍 Available in 50+ countries\n📦 Standard lead time: 2–4 weeks\n⚡ Express options available on request\n📜 Full export documentation & customs support included\n\nFor large orders or standing purchase agreements, contact our sales team to discuss dedicated logistics.",
    links: [
      { label: "Contact Sales", href: "/contact" },
    ],
  },

  // ── OEM / Custom ────────────────────────────────────────────────────────
  {
    id: "oem",
    keywords: ["oem", "odm", "custom", "private label", "branded", "design", "bespoke", "tailor", "specification", "special"],
    label: "OEM & Custom",
    answer:
      "Bäramed offers full OEM and ODM services:\n\n🛠️ Custom instrument design & prototyping\n🏷️ Private label / white-label options\n📐 Production to your specific dimensions & finish\n✔️ Full regulatory documentation support\n\nMinimum order quantities apply. Contact us to discuss your requirements.",
    links: [
      { label: "Discuss Custom Orders", href: "/contact" },
    ],
  },

  // ── About ───────────────────────────────────────────────────────────────
  {
    id: "about",
    keywords: ["about", "company", "who", "bäramed", "baramed", "history", "founded", "since", "brand", "team", "contact us"],
    label: "About Bäramed",
    answer:
      "Bäramed Instrumente GmbH is a German manufacturer of high-quality surgical instruments. We supply hospitals, clinics, distributors, and procurement agencies across 50+ countries.\n\nOur focus is precision, quality, and compliance — every instrument we make is ISO 13485 certified, CE marked, and MDR compliant.",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },

  // ── Scissors ────────────────────────────────────────────────────────────
  {
    id: "scissors",
    keywords: ["scissors", "mayo", "metzenbaum", "iris", "stitch", "suture", "cut", "dissect"],
    label: "Scissors",
    answer:
      "Our scissors range includes:\n\n✂️ Mayo Scissors (straight & curved) — heavy tissue\n✂️ Metzenbaum Scissors — delicate tissue dissection\n✂️ Iris Scissors — fine ophthalmic & microsurgery\n✂️ Stitch / Suture Scissors — suture removal\n\nAvailable in various lengths and finishes.",
    links: [{ label: "View Scissors", href: "/products/by-instrument-type" }],
  },

  // ── Forceps ─────────────────────────────────────────────────────────────
  {
    id: "forceps",
    keywords: ["forcep", "clamp", "hemostatic", "kelly", "kocher", "tissue", "babcock", "allis"],
    label: "Forceps & Clamps",
    answer:
      "Our forceps & clamps catalogue includes:\n\n🔧 Hemostatic Forceps (Kelly, Halsted, Crile)\n🔧 Tissue Forceps (Allis, Babcock, Duval)\n🔧 Bone-holding Forceps (Kocher, Lane)\n🔧 Intestinal Clamps\n\nAll available in straight and curved configurations.",
    links: [{ label: "View Forceps", href: "/products/by-instrument-type" }],
  },

  // ── Needle Holders ──────────────────────────────────────────────────────
  {
    id: "needle-holders",
    keywords: ["needle", "holder", "sutur", "mayo hegar", "castroviejo", "webster", "sew"],
    label: "Needle Holders",
    answer:
      "Our needle holders include:\n\n🪡 Mayo-Hegar — general surgical suturing\n🪡 Castroviejo — ophthalmic & microsurgery\n🪡 Webster — delicate suturing\n🪡 Mathieu — ratchet-style for ease of use\n\nAvailable in 14cm, 16cm, 18cm, 20cm lengths.",
    links: [{ label: "View Needle Holders", href: "/products/by-instrument-type" }],
  },

  // ── Retractors ──────────────────────────────────────────────────────────
  {
    id: "retractors",
    keywords: ["retract", "langenbeck", "deaver", "ribbon", "self-retain", "gelpi", "weitlaner"],
    label: "Retractors",
    answer:
      "Our retractor range covers:\n\n📌 Langenbeck — general abdominal surgery\n📌 Deaver — deep abdominal retraction\n📌 Self-retaining Retractors (Gelpi, Weitlaner, Finochietto)\n📌 Ribbon / Malleable Retractors\n\nAvailable in multiple sizes for different surgical depths.",
    links: [{ label: "View Retractors", href: "/products/by-instrument-type" }],
  },

  // ── Fallback ────────────────────────────────────────────────────────────
  {
    id: "fallback",
    keywords: [],
    label: "Contact Us",
    answer:
      "I'm not sure about that specific question. For detailed technical enquiries, pricing, or product availability, our team is happy to help directly.",
    links: [
      { label: "Contact Our Team", href: "/contact" },
      { label: "Browse Products", href: "/products" },
    ],
  },
];

// ── Greeting shown when chat first opens ─────────────────────────────────────
export const greeting =
  "👋 Hi! I'm the **Bäramed Assistant**.\n\nAsk me anything about our surgical instruments, certifications, ordering, or manufacturing — or tap a topic below to get started.";
