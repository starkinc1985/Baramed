import Link from "next/link";
import { InstrumentTypeCategory, SurgeryTypeCategory } from "@/types/product";

interface CategoryCardProps {
  category: InstrumentTypeCategory | SurgeryTypeCategory;
  basePath: string;
  subcategoryLabel?: string;
}

export default function CategoryCard({ 
  category, 
  basePath,
  subcategoryLabel = "Subcategories:"
}: CategoryCardProps) {

  return (
    <Link
      href={`${basePath}/${category.slug}`}
      className="group flex min-h-[120px] flex-col rounded-lg border border-stroke bg-white p-4 transition-all hover:border-primary hover:bg-primary/5 dark:border-strokedark dark:bg-blacksection"
    >
      <h3 className="mb-2 text-lg font-semibold text-black transition-colors group-hover:text-primary dark:text-white">
        {category.name}
      </h3>
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="mb-3 flex-1">
          <p className="mb-2 text-xs font-medium text-waterloo">
            {subcategoryLabel}
          </p>
          <ul className="space-y-1">
            {category.subcategories.slice(0, 3).map((subcat) => (
              <li
                key={subcat.id}
                className="text-xs text-waterloo"
              >
                • {subcat.name}
              </li>
            ))}
            {category.subcategories.length > 3 && (
              <li className="text-xs font-medium text-primary">
                +{category.subcategories.length - 3} more
              </li>
            )}
          </ul>
        </div>
      )}
      <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-primary">
        View Products
        <svg
          className="h-3 w-3 transition-transform group-hover:translate-x-1"
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
    </Link>
  );
}

