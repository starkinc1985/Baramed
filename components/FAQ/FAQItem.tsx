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
    <div className={`mb-4 flex min-h-[70px] flex-col overflow-hidden rounded-xl border-2 transition-all duration-300 last:mb-0 ${
      activeFaq === id
        ? "border-primary bg-primary/5 shadow-md dark:border-primary dark:bg-primary/10"
        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800"
    }`}>
      <button
        onClick={() => {
          handleFaqToggle(id);
        }}
        className="flex min-h-[70px] cursor-pointer items-center justify-between px-5 py-4 text-left transition-colors"
      >
        <span className="pr-4 text-sm font-bold uppercase leading-snug text-slate-900 dark:text-white sm:text-base">
          Q. {quest}
        </span>
        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
          activeFaq === id
            ? "bg-primary text-white"
            : "bg-slate-100 text-primary dark:bg-slate-700"
        }`}>
          {activeFaq === id ? (
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
            </svg>
          ) : (
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          activeFaq === id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t-2 border-slate-200 bg-white px-5 py-4 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {ans}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
