'use client';
import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";

const DiscoverOurStory = () => {
  return (
    <div className="w-full h-[49rem] bg-white pt-36 flex items-center justify-center relative shadow-xl">

      <div className="w-[75rem] flex items-center justify-between gap-24">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: .5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .5 }}
          className="w-1/2 h-96 relative z-20"
        >
          <Image src={"/book2.jpeg"} alt={"Dictionary"} fill={true}  className="object-cover rounded-2xl" loading="lazy" />
        </motion.div>
        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: .5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .5 }}
          className="w-1/2 h-96 flex flex-col justify-center gap-8"
        >
          <p className="font-bold text-accent text-xl">Discover Our Story</p>
          <h2 className="font-bold text-4xl">The Inspiration Behind Learn Norsk</h2>
          <p>Learn Norsk was founded to provide accessible and engaging Norwegian language education, helping individuals immerse themselves in the language and culture with effective online resources.</p>
          <button className="submit-btn2">Read More</button>
        </motion.div>

      </div>

    </div>
  );
};

export default DiscoverOurStory;