import Link from "next/link";
import Image from "next/image";
import { InstrumentTypeCategory, SurgeryTypeCategory } from "@/types/product";

interface CategoryCardProps {
  category: InstrumentTypeCategory | SurgeryTypeCategory;
  basePath: string;
  subcategoryLabel?: string;
}

// Helper function to get category image URL - Using medical/surgical instrument themed images
function getCategoryImage(slug: string): string {
  const imageMap: Record<string, string> = {
    // Instrument Types - Medical/Surgical themed
    "scissors": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=400&fit=crop&q=80",
    "forceps": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&q=80",
    "needle-holders": "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop&q=80",
    "retractors": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop&q=80",
    "clamps": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop&q=80",
    "rongeurs-bone-instruments": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&q=80",
    "orthopedic-instruments": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&q=80",
    "ent-instruments": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop&q=80",
    "gynecology-instruments": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=400&fit=crop&q=80",
    "suction-instruments": "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop&q=80",
    "probes-dilators": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop&q=80",
    "elevators": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop&q=80",
    "dental-instruments": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&q=80",
    "sterilization-accessories": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=400&fit=crop&q=80",
    // Surgery Types - Medical/Surgical themed
    "general-surgery": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&q=80",
    "orthopedic-surgery": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&q=80",
    "ent-surgery": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop&q=80",
    "plastic-surgery": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=400&fit=crop&q=80",
    "neurosurgery": "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop&q=80",
    "gynecology-obstetrics": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop&q=80",
    "cardiovascular-surgery": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&q=80",
    "dental-oral-surgery": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop&q=80",
    "urology": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=400&fit=crop&q=80",
    "thoracic-surgery": "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop&q=80",
  };
  
  return imageMap[slug] || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&q=80";
}

export default function CategoryCard({ 
  category, 
  basePath,
  subcategoryLabel = "Subcategories:"
}: CategoryCardProps) {
  const categoryImage = getCategoryImage(category.slug);

  return (
    <Link
      href={`${basePath}/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl border-2 border-stroke bg-white shadow-md transition-all duration-300 hover:border-primary hover:shadow-2xl hover:-translate-y-1 dark:border-strokedark dark:bg-blacksection"
    >
      {/* Category Image */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <Image
          src={categoryImage}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white drop-shadow-lg">
            {category.name}
          </h3>
        </div>
      </div>

      {/* Category Content */}
      <div className="p-6">
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="mb-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-waterloo">
              {subcategoryLabel}
            </p>
            <ul className="space-y-2">
              {category.subcategories.slice(0, 3).map((subcat) => (
                <li
                  key={subcat.id}
                  className="flex items-center gap-2 text-sm text-waterloo"
                >
                  <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {subcat.name}
                </li>
              ))}
              {category.subcategories.length > 3 && (
                <li className="text-sm font-semibold text-primary">
                  +{category.subcategories.length - 3} more subcategories
                </li>
              )}
            </ul>
          </div>
        )}
        <span className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-all group-hover:bg-primary group-hover:text-white">
          View Products
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

