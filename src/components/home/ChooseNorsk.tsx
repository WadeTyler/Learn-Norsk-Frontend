'use client';
import React from 'react';
import {IconCheck} from "@tabler/icons-react";
import Image from "next/image";
import CTA1 from "@/components/home/CTA1";
import {motion} from "framer-motion";

const ChooseNorsk = () => {
  return (
    <div className="w-full h-[49rem] bg-background2 flex items-center justify-center relative pb-36">
      <div className="max-w-[75rem] h-96 flex items-center justify-evenly gap-16">
        {/* Left Side */}
        <motion.div
          initial={{opacity: 0, x: -100}}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: .5 }}
          exit={{opacity: 0}}
          transition={{duration: .5}}
          className="w-[40rem] relative h-[30rem] flex flex-col gap-8"
        >
          <p className="text-accent font-bold text-lg">Why Choose Learn Norsk</p>
          <h2 className="font-bold text-4xl">Experience unparalleled language learning with our unique approach,
            tailored for every type of learner.</h2>

          <ul className="gap-2 font-bold flex flex-col">
            <p className="inline-flex items-center gap-2"><IconCheck/> User-Friendly Interface</p>
            <p className="inline-flex items-center gap-2"><IconCheck/> Comprehensive Content Library</p>
            <p className="inline-flex items-center gap-2"><IconCheck/> Culturally Immersive Learning</p>
            <p className="inline-flex items-center gap-2"><IconCheck/> Dedicated Learner Support</p>
          </ul>

          <button className="submit-btn2">Read More</button>

        </motion.div>

        {/* Right Side*/}
        <motion.div
          initial={{opacity: 0, x: 100}}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: .5 }}
          exit={{opacity: 0}}
          transition={{duration: .5}}
          className="w-[40rem] h-96 relative z-20"
        >
          <Image src={"/book.jpeg"} alt={"Dictionary"} fill={true} className="object-cover rounded-2xl"
                 loading="lazy"/>
        </motion.div>
      </div>

      <CTA1/>
    </div>
  );
};

export default ChooseNorsk;