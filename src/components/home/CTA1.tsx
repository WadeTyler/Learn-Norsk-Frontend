'use client';
import {motion} from 'framer-motion';
import React from 'react';

const CTA1 = () => {
  return (
    <motion.div
      initial={{opacity: 0, y: '65%'}}
      whileInView={{ opacity: 1, y: '50%' }}
      viewport={{ once: true, amount: .5 }}
      transition={{duration: .5}}
      className="w-[75rem] h-72 flex flex-col items-center justify-center gap-8 bg-white shadow-xl absolute z-20 rounded-xl bottom-0 translate-y-1/2"
    >
      <h3 className="font-bold text-4xl">Start Your Norwegian Learning Journey Today!</h3>
      <p>Join our interactive platform and unlock the beauty of the Norwegian language.</p>
      <button className="submit-btn2">Start Learning Now</button>
    </motion.div>
  );
};

export default CTA1;