"use client";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const presets: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

interface Props {
  children: ReactNode;
  animation?: keyof typeof presets;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function AnimateOnScroll({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: Props) {
  return (
    <motion.div
      variants={presets[animation]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-72px" }}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
