"use client";
import { motion } from "framer-motion";

type HeaderInfo = {
  title: string;
  subtitle: string;
  description: string;
};

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const SectionHeader = ({ headerInfo }: { headerInfo: HeaderInfo }) => {
  const { title, subtitle, description } = headerInfo;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="mx-auto text-center"
    >
      <motion.div variants={item}>
        <span className="mb-3 inline-block rounded-full border border-primary/20 bg-primary/8 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
          {title}
        </span>
      </motion.div>
      <motion.h2
        variants={item}
        className="mx-auto mb-2 text-2xl font-bold text-black dark:text-white md:w-4/5 lg:text-3xl xl:w-1/2"
      >
        {subtitle}
      </motion.h2>
      <motion.p
        variants={item}
        className="mx-auto text-sm text-waterloo md:w-4/5 lg:w-3/5 xl:w-[46%]"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default SectionHeader;
