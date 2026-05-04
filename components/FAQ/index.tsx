"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import FAQItem from "./FAQItem";

type FaqRow = {
  id: string;
  question: string;
  answer: string;
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const FAQ = ({ faqs }: { faqs: FaqRow[] }) => {
  const [activeFaq, setActiveFaq] = useState(0);

  const handleFaqToggle = (id: number) => {
    activeFaq === id ? setActiveFaq(0) : setActiveFaq(id);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="space-y-3"
    >
      {faqs.map((faq, idx) => (
        <motion.div key={faq.id} variants={item}>
          <FAQItem
            faqData={{
              id: idx + 1,
              quest: faq.question,
              ans: faq.answer,
              activeFaq,
              handleFaqToggle,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FAQ;
