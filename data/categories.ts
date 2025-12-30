import { InstrumentTypeCategory, SurgeryTypeCategory } from "@/types/product";

// Categories by Instrument Type
export const instrumentTypeCategories: InstrumentTypeCategory[] = [
  {
    id: "scissors",
    name: "Scissors",
    slug: "scissors",
    type: "instrument",
    subcategories: [
      { id: "mayo-scissors", name: "Mayo Scissors", slug: "mayo-scissors", type: "instrument" },
      { id: "metzenbaum-scissors", name: "Metzenbaum Scissors", slug: "metzenbaum-scissors", type: "instrument" },
      { id: "iris-scissors", name: "Iris Scissors", slug: "iris-scissors", type: "instrument" },
      { id: "operating-scissors", name: "Operating Scissors", slug: "operating-scissors", type: "instrument" },
      { id: "bandage-scissors", name: "Bandage Scissors", slug: "bandage-scissors", type: "instrument" },
      { id: "tenotomy-scissors", name: "Tenotomy Scissors", slug: "tenotomy-scissors", type: "instrument" },
      { id: "micro-scissors", name: "Micro Scissors", slug: "micro-scissors", type: "instrument" },
    ],
  },
  {
    id: "forceps",
    name: "Forceps",
    slug: "forceps",
    type: "instrument",
    subcategories: [
      { id: "tissue-forceps", name: "Tissue Forceps", slug: "tissue-forceps", type: "instrument" },
      { id: "dressing-forceps", name: "Dressing Forceps", slug: "dressing-forceps", type: "instrument" },
      { id: "hemostatic-forceps", name: "Hemostatic Forceps", slug: "hemostatic-forceps", type: "instrument" },
      { id: "adson-forceps", name: "Adson Forceps", slug: "adson-forceps", type: "instrument" },
      { id: "micro-forceps", name: "Micro Forceps", slug: "micro-forceps", type: "instrument" },
      { id: "thumb-forceps", name: "Thumb Forceps", slug: "thumb-forceps", type: "instrument" },
    ],
  },
  {
    id: "needle-holders",
    name: "Needle Holders",
    slug: "needle-holders",
    type: "instrument",
    subcategories: [
      { id: "mayo-hegar", name: "Mayo-Hegar", slug: "mayo-hegar", type: "instrument" },
      { id: "olsen-hegar", name: "Olsen-Hegar", slug: "olsen-hegar", type: "instrument" },
      { id: "mathieu", name: "Mathieu", slug: "mathieu", type: "instrument" },
      { id: "micro-needle-holders", name: "Micro Needle Holders", slug: "micro-needle-holders", type: "instrument" },
    ],
  },
  {
    id: "retractors",
    name: "Retractors",
    slug: "retractors",
    type: "instrument",
    subcategories: [
      { id: "handheld-retractors", name: "Handheld Retractors", slug: "handheld-retractors", type: "instrument" },
      { id: "self-retaining-retractors", name: "Self-Retaining Retractors", slug: "self-retaining-retractors", type: "instrument" },
      { id: "abdominal-retractors", name: "Abdominal Retractors", slug: "abdominal-retractors", type: "instrument" },
      { id: "neurosurgical-retractors", name: "Neurosurgical Retractors", slug: "neurosurgical-retractors", type: "instrument" },
    ],
  },
  {
    id: "clamps",
    name: "Clamps",
    slug: "clamps",
    type: "instrument",
    subcategories: [
      { id: "hemostatic-clamps", name: "Hemostatic Clamps", slug: "hemostatic-clamps", type: "instrument" },
      { id: "bulldog-clamps", name: "Bulldog Clamps", slug: "bulldog-clamps", type: "instrument" },
      { id: "vascular-clamps", name: "Vascular Clamps", slug: "vascular-clamps", type: "instrument" },
    ],
  },
  {
    id: "rongeurs-bone",
    name: "Rongeurs & Bone Instruments",
    slug: "rongeurs-bone",
    type: "instrument",
    subcategories: [
      { id: "bone-rongeurs", name: "Bone Rongeurs", slug: "bone-rongeurs", type: "instrument" },
      { id: "bone-cutters", name: "Bone Cutters", slug: "bone-cutters", type: "instrument" },
      { id: "bone-holders", name: "Bone Holders", slug: "bone-holders", type: "instrument" },
      { id: "periosteal-elevators", name: "Periosteal Elevators", slug: "periosteal-elevators", type: "instrument" },
    ],
  },
  {
    id: "orthopedic",
    name: "Orthopedic Instruments",
    slug: "orthopedic",
    type: "instrument",
    subcategories: [
      { id: "bone-drills", name: "Bone Drills", slug: "bone-drills", type: "instrument" },
      { id: "chisels-gouges", name: "Chisels & Gouges", slug: "chisels-gouges", type: "instrument" },
      { id: "osteotomes", name: "Osteotomes", slug: "osteotomes", type: "instrument" },
      { id: "bone-plates-screws", name: "Bone Plates & Screws", slug: "bone-plates-screws", type: "instrument" },
    ],
  },
  {
    id: "ent",
    name: "ENT Instruments",
    slug: "ent",
    type: "instrument",
    subcategories: [
      { id: "ear-instruments", name: "Ear Instruments", slug: "ear-instruments", type: "instrument" },
      { id: "nose-instruments", name: "Nose Instruments", slug: "nose-instruments", type: "instrument" },
      { id: "throat-instruments", name: "Throat Instruments", slug: "throat-instruments", type: "instrument" },
      { id: "micro-ent-tools", name: "Micro ENT Tools", slug: "micro-ent-tools", type: "instrument" },
    ],
  },
  {
    id: "gynecology",
    name: "Gynecology Instruments",
    slug: "gynecology",
    type: "instrument",
    subcategories: [
      { id: "speculums", name: "Speculums", slug: "speculums", type: "instrument" },
      { id: "uterine-instruments", name: "Uterine Instruments", slug: "uterine-instruments", type: "instrument" },
      { id: "cervical-instruments", name: "Cervical Instruments", slug: "cervical-instruments", type: "instrument" },
    ],
  },
  {
    id: "suturing-stapling",
    name: "Suturing & Stapling",
    slug: "suturing-stapling",
    type: "instrument",
    subcategories: [
      { id: "suturing-instruments", name: "Suturing Instruments", slug: "suturing-instruments", type: "instrument" },
      { id: "skin-staplers", name: "Skin Staplers / Removers", slug: "skin-staplers", type: "instrument" },
    ],
  },
  {
    id: "suction",
    name: "Suction Instruments",
    slug: "suction",
    type: "instrument",
    subcategories: [
      { id: "yankauer", name: "Yankauer", slug: "yankauer", type: "instrument" },
      { id: "poole", name: "Poole", slug: "poole", type: "instrument" },
      { id: "frazier", name: "Frazier", slug: "frazier", type: "instrument" },
    ],
  },
  {
    id: "probes-dilators",
    name: "Probes & Dilators",
    slug: "probes-dilators",
    type: "instrument",
    subcategories: [
      { id: "surgical-probes", name: "Surgical Probes", slug: "surgical-probes", type: "instrument" },
      { id: "dilators", name: "Dilators", slug: "dilators", type: "instrument" },
    ],
  },
  {
    id: "elevators",
    name: "Elevators",
    slug: "elevators",
    type: "instrument",
    subcategories: [
      { id: "periosteal-elevators", name: "Periosteal", slug: "periosteal-elevators", type: "instrument" },
      { id: "periodontal-elevators", name: "Periodontal", slug: "periodontal-elevators", type: "instrument" },
      { id: "ent-elevators", name: "ENT Elevators", slug: "ent-elevators", type: "instrument" },
    ],
  },
  {
    id: "dental",
    name: "Dental Instruments",
    slug: "dental",
    type: "instrument",
    subcategories: [
      { id: "extraction-forceps", name: "Extraction Forceps", slug: "extraction-forceps", type: "instrument" },
      { id: "dental-elevators", name: "Elevators", slug: "dental-elevators", type: "instrument" },
      { id: "diagnostic-instruments", name: "Diagnostic Instruments", slug: "diagnostic-instruments", type: "instrument" },
    ],
  },
  {
    id: "sterilization-accessories",
    name: "Sterilization & Accessories",
    slug: "sterilization-accessories",
    type: "instrument",
    subcategories: [
      { id: "instrument-trays", name: "Instrument Trays", slug: "instrument-trays", type: "instrument" },
      { id: "containers", name: "Containers", slug: "containers", type: "instrument" },
      { id: "racks", name: "Racks", slug: "racks", type: "instrument" },
      { id: "wire-mesh-baskets", name: "Wire Mesh Baskets", slug: "wire-mesh-baskets", type: "instrument" },
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
      { id: "gs-scissors", name: "Scissors", slug: "gs-scissors", type: "surgery" },
      { id: "gs-forceps", name: "Forceps", slug: "gs-forceps", type: "surgery" },
      { id: "gs-needle-holders", name: "Needle Holders", slug: "gs-needle-holders", type: "surgery" },
      { id: "gs-retractors", name: "Retractors", slug: "gs-retractors", type: "surgery" },
      { id: "gs-clamps", name: "Clamps", slug: "gs-clamps", type: "surgery" },
    ],
  },
  {
    id: "orthopedic-surgery",
    name: "Orthopedic Surgery",
    slug: "orthopedic-surgery",
    type: "surgery",
    subcategories: [
      { id: "os-rongeurs", name: "Rongeurs", slug: "os-rongeurs", type: "surgery" },
      { id: "os-bone-cutters", name: "Bone Cutters", slug: "os-bone-cutters", type: "surgery" },
      { id: "os-drills", name: "Drills", slug: "os-drills", type: "surgery" },
      { id: "os-osteotomes", name: "Osteotomes", slug: "os-osteotomes", type: "surgery" },
      { id: "os-plates-screws", name: "Plates & Screws", slug: "os-plates-screws", type: "surgery" },
    ],
  },
  {
    id: "ent-surgery",
    name: "ENT Surgery",
    slug: "ent-surgery",
    type: "surgery",
    subcategories: [
      { id: "ent-ear", name: "Ear Instruments", slug: "ent-ear", type: "surgery" },
      { id: "ent-nasal", name: "Nasal Instruments", slug: "ent-nasal", type: "surgery" },
      { id: "ent-laryngeal", name: "Laryngeal Instruments", slug: "ent-laryngeal", type: "surgery" },
    ],
  },
  {
    id: "plastic-surgery",
    name: "Plastic Surgery",
    slug: "plastic-surgery",
    type: "surgery",
    subcategories: [
      { id: "ps-micro-scissors", name: "Micro Scissors", slug: "ps-micro-scissors", type: "surgery" },
      { id: "ps-fine-forceps", name: "Fine Forceps", slug: "ps-fine-forceps", type: "surgery" },
      { id: "ps-skin-hooks", name: "Skin Hooks", slug: "ps-skin-hooks", type: "surgery" },
    ],
  },
  {
    id: "neurosurgery",
    name: "Neurosurgery",
    slug: "neurosurgery",
    type: "surgery",
    subcategories: [
      { id: "ns-micro-forceps", name: "Micro Forceps", slug: "ns-micro-forceps", type: "surgery" },
      { id: "ns-micro-scissors", name: "Micro Scissors", slug: "ns-micro-scissors", type: "surgery" },
      { id: "ns-self-retaining-retractors", name: "Self-Retaining Retractors", slug: "ns-self-retaining-retractors", type: "surgery" },
      { id: "ns-rongeurs", name: "Rongeurs", slug: "ns-rongeurs", type: "surgery" },
    ],
  },
  {
    id: "gynecology-obstetrics",
    name: "Gynecology & Obstetrics",
    slug: "gynecology-obstetrics",
    type: "surgery",
    subcategories: [
      { id: "go-speculums", name: "Speculums", slug: "go-speculums", type: "surgery" },
      { id: "go-uterine-forceps", name: "Uterine Forceps", slug: "go-uterine-forceps", type: "surgery" },
      { id: "go-dilators", name: "Dilators", slug: "go-dilators", type: "surgery" },
    ],
  },
  {
    id: "cardiovascular-surgery",
    name: "Cardiovascular Surgery",
    slug: "cardiovascular-surgery",
    type: "surgery",
    subcategories: [
      { id: "cs-vascular-clamps", name: "Vascular Clamps", slug: "cs-vascular-clamps", type: "surgery" },
      { id: "cs-bulldog-clamps", name: "Bulldog Clamps", slug: "cs-bulldog-clamps", type: "surgery" },
      { id: "cs-micro-needle-holders", name: "Micro Needle Holders", slug: "cs-micro-needle-holders", type: "surgery" },
    ],
  },
  {
    id: "dental-oral-surgery",
    name: "Dental & Oral Surgery",
    slug: "dental-oral-surgery",
    type: "surgery",
    subcategories: [
      { id: "dos-extraction", name: "Extraction Instruments", slug: "dos-extraction", type: "surgery" },
      { id: "dos-elevators", name: "Elevators", slug: "dos-elevators", type: "surgery" },
      { id: "dos-curettes", name: "Curettes", slug: "dos-curettes", type: "surgery" },
    ],
  },
  {
    id: "urology",
    name: "Urology",
    slug: "urology",
    type: "surgery",
    subcategories: [
      { id: "urology-forceps", name: "Urology Forceps", slug: "urology-forceps", type: "surgery" },
      { id: "urology-dilators", name: "Dilators", slug: "urology-dilators", type: "surgery" },
      { id: "urology-stone-graspers", name: "Stone Graspers", slug: "urology-stone-graspers", type: "surgery" },
    ],
  },
  {
    id: "thoracic-surgery",
    name: "Thoracic Surgery",
    slug: "thoracic-surgery",
    type: "surgery",
    subcategories: [
      { id: "ts-rib-spreaders", name: "Rib Spreaders", slug: "ts-rib-spreaders", type: "surgery" },
      { id: "ts-thoracic-forceps", name: "Thoracic Forceps", slug: "ts-thoracic-forceps", type: "surgery" },
    ],
  },
];

