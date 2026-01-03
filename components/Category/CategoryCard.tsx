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
      className="group flex min-h-[140px] flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary"
    >
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-lg font-bold leading-tight text-slate-900 transition-colors group-hover:text-primary dark:text-white">
          {category.name}
        </h3>
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
          <svg className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="mb-4 flex-1">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {subcategoryLabel}
          </p>
          <ul className="space-y-1.5">
            {category.subcategories.slice(0, 3).map((subcat) => (
              <li
                key={subcat.id}
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
              >
                <svg className="h-3 w-3 flex-shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20">
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
      
      <div className="mt-auto pt-3 border-t border-slate-200 dark:border-slate-700">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
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

