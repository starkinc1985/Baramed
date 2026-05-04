import React from "react";
import { Feature } from "@/types/feature";
import Image from "next/image";
import { motion } from "framer-motion";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, description } = feature;

  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -10,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="animate_top z-40 rounded-xl border border-stroke bg-white p-7.5 shadow-[0_2px_14px_rgba(10,30,100,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(0,107,255,0.12)] dark:border-strokedark dark:bg-darkcard dark:hover:border-primary/30 xl:p-12.5"
      >
        <div className="relative flex h-16 w-16 items-center justify-center rounded-[4px] bg-primary">
          <Image src={icon} width={36} height={36} alt="title" />
        </div>
        <h3 className="mb-5 mt-7.5 text-xl font-semibold text-black dark:text-white xl:text-itemtitle">
          {title}
        </h3>
        <p>{description}</p>
      </motion.div>
    </>
  );
};

export default SingleFeature;
