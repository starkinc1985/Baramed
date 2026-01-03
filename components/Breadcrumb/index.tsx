import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="mb-6 flex" aria-label="breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link
                href={item.href}
                className="text-sm font-medium text-waterloo hover:text-primary dark:text-gray-400 dark:hover:text-primary"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-sm font-medium text-black dark:text-white">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <svg
                className="mx-2 h-4 w-4 text-waterloo dark:text-gray-400"
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
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

