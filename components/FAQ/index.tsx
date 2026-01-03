"use client";
import { useState } from "react";
import FAQItem from "./FAQItem";
import faqData from "./faqData";

const FAQ = () => {
  const [activeFaq, setActiveFaq] = useState(0);

  const handleFaqToggle = (id: number) => {
    activeFaq === id ? setActiveFaq(0) : setActiveFaq(id);
  };

  return (
    <div className="space-y-3">
      {faqData.map((faq, key) => (
        <FAQItem
          key={key}
          faqData={{ ...faq, activeFaq, handleFaqToggle }}
        />
      ))}
    </div>
  );
};

export default FAQ;
