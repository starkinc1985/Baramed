"use client";
import React from "react";
import { motion } from "framer-motion";
import featuresData from "./featuresData";
import SingleFeature from "./SingleFeature";
import SectionHeader from "../Common/SectionHeader";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const Feature = () => {
  return (
    <section id="features" className="border-b border-stroke bg-sectionalt py-10 dark:border-strokedark dark:bg-darksectionone">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "BÄRAMED FEATURES",
            subtitle: "Why Choose Bäramed",
            description: `Discover the key features that make Bäramed the preferred choice for healthcare professionals worldwide. Quality, precision, and reliability in every instrument.`,
          }}
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuresData.map((feature, key) => (
            <SingleFeature feature={feature} key={key} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Feature;
