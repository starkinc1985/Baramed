"use client";
import { useState } from "react";
import FAQItem from "./FAQItem";

type FaqRow = {
  id: string;
  question: string;
  answer: string;
};

const FAQ = ({ faqs }: { faqs: FaqRow[] }) => {
  const [activeFaq, setActiveFaq] = useState(0);

  const handleFaqToggle = (id: number) => {
    activeFaq === id ? setActiveFaq(0) : setActiveFaq(id);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <FAQItem
          key={faq.id}
          faqData={{
            id: idx + 1,
            quest: faq.question,
            ans: faq.answer,
            activeFaq,
            handleFaqToggle,
          }}
        />
      ))}
    </div>
  );
};

export default FAQ;
