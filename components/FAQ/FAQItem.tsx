type FaqData = {
  activeFaq: number;
  id: number;
  handleFaqToggle: (id: number) => void;
  quest: string;
  ans: string;
};

const FAQItem = ({ faqData }: { faqData: FaqData }) => {
  const { activeFaq, id, handleFaqToggle, quest, ans } = faqData;

  return (
    <div className="mb-3 flex min-h-[60px] flex-col rounded-lg border border-stroke bg-white last:mb-0 dark:border-strokedark dark:bg-blacksection">
      <button
        onClick={() => {
          handleFaqToggle(id);
        }}
        className="flex min-h-[60px] cursor-pointer items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
      >
        <span className="pr-4 text-xs font-semibold uppercase leading-tight text-black dark:text-white sm:text-sm">
          Q. {quest}
        </span>
        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
          {activeFaq === id ? (
            <svg
              className="h-4 w-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
            </svg>
          ) : (
            <svg
              className="h-4 w-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          activeFaq === id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-stroke px-4 py-3 dark:border-strokedark">
          <p className="text-sm leading-relaxed text-waterloo">
            {ans}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
