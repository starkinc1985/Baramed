import { InstrumentTypeCategory, SurgeryTypeCategory } from "@/types/product";

// Categories by Instrument Type
export const instrumentTypeCategories: InstrumentTypeCategory[] = [
  {
    id: "scissors",
    name: "Scissors",
    slug: "scissors",
    type: "instrument",
    subcategories: [
      { id: "mayo-scissors", name: "Mayo Scissors", slug: "mayo-scissors" },
      { id: "metzenbaum-scissors", name: "Metzenbaum Scissors", slug: "metzenbaum-scissors" },
      { id: "iris-scissors", name: "Iris Scissors", slug: "iris-scissors" },
      { id: "operating-scissors", name: "Operating Scissors", slug: "operating-scissors" },
      { id: "bandage-scissors", name: "Bandage Scissors", slug: "bandage-scissors" },
      { id: "tenotomy-scissors", name: "Tenotomy Scissors", slug: "tenotomy-scissors" },
      { id: "micro-scissors", name: "Micro Scissors", slug: "micro-scissors" },
    ],
  },
  {
    id: "forceps",
    name: "Forceps",
    slug: "forceps",
    type: "instrument",
    subcategories: [
      { id: "tissue-forceps", name: "Tissue Forceps", slug: "tissue-forceps" },
      { id: "dressing-forceps", name: "Dressing Forceps", slug: "dressing-forceps" },
      { id: "hemostatic-forceps", name: "Hemostatic Forceps", slug: "hemostatic-forceps" },
      { id: "adson-forceps", name: "Adson Forceps", slug: "adson-forceps" },
      { id: "micro-forceps", name: "Micro Forceps", slug: "micro-forceps" },
      { id: "thumb-forceps", name: "Thumb Forceps", slug: "thumb-forceps" },
    ],
  },
  {
    id: "needle-holders",
    name: "Needle Holders",
    slug: "needle-holders",
    type: "instrument",
    subcategories: [
      { id: "mayo-hegar", name: "Mayo-Hegar", slug: "mayo-hegar" },
      { id: "olsen-hegar", name: "Olsen-Hegar", slug: "olsen-hegar" },
      { id: "mathieu", name: "Mathieu", slug: "mathieu" },
      { id: "micro-needle-holders", name: "Micro Needle Holders", slug: "micro-needle-holders" },
    ],
  },
  {
    id: "retractors",
    name: "Retractors",
    slug: "retractors",
    type: "instrument",
    subcategories: [
      { id: "handheld-retractors", name: "Handheld Retractors", slug: "handheld-retractors" },
      { id: "self-retaining-retractors", name: "Self-Retaining Retractors", slug: "self-retaining-retractors" },
      { id: "abdominal-retractors", name: "Abdominal Retractors", slug: "abdominal-retractors" },
      { id: "neurosurgical-retractors", name: "Neurosurgical Retractors", slug: "neurosurgical-retractors" },
    ],
  },
  {
    id: "clamps",
    name: "Clamps",
    slug: "clamps",
    type: "instrument",
    subcategories: [
      { id: "hemostatic-clamps", name: "Hemostatic Clamps", slug: "hemostatic-clamps" },
      { id: "bulldog-clamps", name: "Bulldog Clamps", slug: "bulldog-clamps" },
      { id: "vascular-clamps", name: "Vascular Clamps", slug: "vascular-clamps" },
    ],
  },
  {
    id: "rongeurs-bone",
    name: "Rongeurs & Bone Instruments",
    slug: "rongeurs-bone",
    type: "instrument",
    subcategories: [
      { id: "bone-rongeurs", name: "Bone Rongeurs", slug: "bone-rongeurs" },
      { id: "bone-cutters", name: "Bone Cutters", slug: "bone-cutters" },
      { id: "bone-holders", name: "Bone Holders", slug: "bone-holders" },
      { id: "periosteal-elevators", name: "Periosteal Elevators", slug: "periosteal-elevators" },
    ],
  },
  {
    id: "orthopedic",
    name: "Orthopedic Instruments",
    slug: "orthopedic",
    type: "instrument",
    subcategories: [
      { id: "bone-drills", name: "Bone Drills", slug: "bone-drills" },
      { id: "chisels-gouges", name: "Chisels & Gouges", slug: "chisels-gouges" },
      { id: "osteotomes", name: "Osteotomes", slug: "osteotomes" },
      { id: "bone-plates-screws", name: "Bone Plates & Screws", slug: "bone-plates-screws" },
    ],
  },
  {
    id: "ent",
    name: "ENT Instruments",
    slug: "ent",
    type: "instrument",
    subcategories: [
      { id: "ear-instruments", name: "Ear Instruments", slug: "ear-instruments" },
      { id: "nose-instruments", name: "Nose Instruments", slug: "nose-instruments" },
      { id: "throat-instruments", name: "Throat Instruments", slug: "throat-instruments" },
      { id: "micro-ent-tools", name: "Micro ENT Tools", slug: "micro-ent-tools" },
    ],
  },
  {
    id: "gynecology",
    name: "Gynecology Instruments",
    slug: "gynecology",
    type: "instrument",
    subcategories: [
      { id: "speculums", name: "Speculums", slug: "speculums" },
      { id: "uterine-instruments", name: "Uterine Instruments", slug: "uterine-instruments" },
      { id: "cervical-instruments", name: "Cervical Instruments", slug: "cervical-instruments" },
    ],
  },
  {
    id: "suturing-stapling",
    name: "Suturing & Stapling",
    slug: "suturing-stapling",
    type: "instrument",
    subcategories: [
      { id: "suturing-instruments", name: "Suturing Instruments", slug: "suturing-instruments" },
      { id: "skin-staplers", name: "Skin Staplers / Removers", slug: "skin-staplers" },
    ],
  },
  {
    id: "suction",
    name: "Suction Instruments",
    slug: "suction",
    type: "instrument",
    subcategories: [
      { id: "yankauer", name: "Yankauer", slug: "yankauer" },
      { id: "poole", name: "Poole", slug: "poole" },
      { id: "frazier", name: "Frazier", slug: "frazier" },
    ],
  },
  {
    id: "probes-dilators",
    name: "Probes & Dilators",
    slug: "probes-dilators",
    type: "instrument",
    subcategories: [
      { id: "surgical-probes", name: "Surgical Probes", slug: "surgical-probes" },
      { id: "dilators", name: "Dilators", slug: "dilators" },
    ],
  },
  {
    id: "elevators",
    name: "Elevators",
    slug: "elevators",
    type: "instrument",
    subcategories: [
      { id: "periosteal-elevators", name: "Periosteal", slug: "periosteal-elevators" },
      { id: "periodontal-elevators", name: "Periodontal", slug: "periodontal-elevators" },
      { id: "ent-elevators", name: "ENT Elevators", slug: "ent-elevators" },
    ],
  },
  {
    id: "dental",
    name: "Dental Instruments",
    slug: "dental",
    type: "instrument",
    subcategories: [
      { id: "extraction-forceps", name: "Extraction Forceps", slug: "extraction-forceps" },
      { id: "dental-elevators", name: "Elevators", slug: "dental-elevators" },
      { id: "diagnostic-instruments", name: "Diagnostic Instruments", slug: "diagnostic-instruments" },
    ],
  },
  {
    id: "sterilization-accessories",
    name: "Sterilization & Accessories",
    slug: "sterilization-accessories",
    type: "instrument",
    subcategories: [
      { id: "instrument-trays", name: "Instrument Trays", slug: "instrument-trays" },
      { id: "containers", name: "Containers", slug: "containers" },
      { id: "racks", name: "Racks", slug: "racks" },
      { id: "wire-mesh-baskets", name: "Wire Mesh Baskets", slug: "wire-mesh-baskets" },
    ],
  },
];

// Categories by Surgery Type
export const surgeryTypeCategories: SurgeryTypeCategory[] = [
  {
    id: "general-surgery",
    name: "General Surgery",
    slug: "general-surgery",
    type: "surgery",
    subcategories: [
      { id: "gs-scissors", name: "Scissors", slug: "gs-scissors" },
      { id: "gs-forceps", name: "Forceps", slug: "gs-forceps" },
      { id: "gs-needle-holders", name: "Needle Holders", slug: "gs-needle-holders" },
      { id: "gs-retractors", name: "Retractors", slug: "gs-retractors" },
      { id: "gs-clamps", name: "Clamps", slug: "gs-clamps" },
    ],
  },
  {
    id: "orthopedic-surgery",
    name: "Orthopedic Surgery",
    slug: "orthopedic-surgery",
    type: "surgery",
    subcategories: [
      { id: "os-rongeurs", name: "Rongeurs", slug: "os-rongeurs" },
      { id: "os-bone-cutters", name: "Bone Cutters", slug: "os-bone-cutters" },
      { id: "os-drills", name: "Drills", slug: "os-drills" },
      { id: "os-osteotomes", name: "Osteotomes", slug: "os-osteotomes" },
      { id: "os-plates-screws", name: "Plates & Screws", slug: "os-plates-screws" },
    ],
  },
  {
    id: "ent-surgery",
    name: "ENT Surgery",
    slug: "ent-surgery",
    type: "surgery",
    subcategories: [
      { id: "ent-ear", name: "Ear Instruments", slug: "ent-ear" },
      { id: "ent-nasal", name: "Nasal Instruments", slug: "ent-nasal" },
      { id: "ent-laryngeal", name: "Laryngeal Instruments", slug: "ent-laryngeal" },
    ],
  },
  {
    id: "plastic-surgery",
    name: "Plastic Surgery",
    slug: "plastic-surgery",
    type: "surgery",
    subcategories: [
      { id: "ps-micro-scissors", name: "Micro Scissors", slug: "ps-micro-scissors" },
      { id: "ps-fine-forceps", name: "Fine Forceps", slug: "ps-fine-forceps" },
      { id: "ps-skin-hooks", name: "Skin Hooks", slug: "ps-skin-hooks" },
    ],
  },
  {
    id: "neurosurgery",
    name: "Neurosurgery",
    slug: "neurosurgery",
    type: "surgery",
    subcategories: [
      { id: "ns-micro-forceps", name: "Micro Forceps", slug: "ns-micro-forceps" },
      { id: "ns-micro-scissors", name: "Micro Scissors", slug: "ns-micro-scissors" },
      { id: "ns-self-retaining-retractors", name: "Self-Retaining Retractors", slug: "ns-self-retaining-retractors" },
      { id: "ns-rongeurs", name: "Rongeurs", slug: "ns-rongeurs" },
    ],
  },
  {
    id: "gynecology-obstetrics",
    name: "Gynecology & Obstetrics",
    slug: "gynecology-obstetrics",
    type: "surgery",
    subcategories: [
      { id: "go-speculums", name: "Speculums", slug: "go-speculums" },
      { id: "go-uterine-forceps", name: "Uterine Forceps", slug: "go-uterine-forceps" },
      { id: "go-dilators", name: "Dilators", slug: "go-dilators" },
    ],
  },
  {
    id: "cardiovascular-surgery",
    name: "Cardiovascular Surgery",
    slug: "cardiovascular-surgery",
    type: "surgery",
    subcategories: [
      { id: "cs-vascular-clamps", name: "Vascular Clamps", slug: "cs-vascular-clamps" },
      { id: "cs-bulldog-clamps", name: "Bulldog Clamps", slug: "cs-bulldog-clamps" },
      { id: "cs-micro-needle-holders", name: "Micro Needle Holders", slug: "cs-micro-needle-holders" },
    ],
  },
  {
    id: "dental-oral-surgery",
    name: "Dental & Oral Surgery",
    slug: "dental-oral-surgery",
    type: "surgery",
    subcategories: [
      { id: "dos-extraction", name: "Extraction Instruments", slug: "dos-extraction" },
      { id: "dos-elevators", name: "Elevators", slug: "dos-elevators" },
      { id: "dos-curettes", name: "Curettes", slug: "dos-curettes" },
    ],
  },
  {
    id: "urology",
    name: "Urology",
    slug: "urology",
    type: "surgery",
    subcategories: [
      { id: "urology-forceps", name: "Urology Forceps", slug: "urology-forceps" },
      { id: "urology-dilators", name: "Dilators", slug: "urology-dilators" },
      { id: "urology-stone-graspers", name: "Stone Graspers", slug: "urology-stone-graspers" },
    ],
  },
  {
    id: "thoracic-surgery",
    name: "Thoracic Surgery",
    slug: "thoracic-surgery",
    type: "surgery",
    subcategories: [
      { id: "ts-rib-spreaders", name: "Rib Spreaders", slug: "ts-rib-spreaders" },
      { id: "ts-thoracic-forceps", name: "Thoracic Forceps", slug: "ts-thoracic-forceps" },
    ],
  },
];

