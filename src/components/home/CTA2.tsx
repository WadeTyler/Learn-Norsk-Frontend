'use client';
import React from 'react';
import {motion} from 'framer-motion';

const CTA2 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: '65%' }}
      whileInView={{ opacity: 1, y: '50%' }}
      viewport={{ once: true, amount: .5 }}
      exit={{opacity: 1}}
      transition={{ duration: 0.5 }}
      className="w-[75rem] h-72 flex flex-col items-center justify-center gap-8 bg-white shadow-xl absolute z-20 rounded-xl bottom-0 translate-y-1/2"
    >
      <h3 className="font-bold text-4xl">Ready to Learn Norwegian? Join Us!</h3>
      <p>Sign up today and start your journey towards mastering the Norwegian language and culture.</p>
      <button className="submit-btn2">Start Learning Now</button>
    </motion.div>
  );
};

export default CTA2;