'use client';
import React from 'react';
import Image from "next/image";
import { motion} from 'framer-motion';

const Hero = () => {
  return (
    <div
      className="w-full h-[40rem] bg-accent relative"
    >
      <div className="relative w-full h-full">
        <Image src={"/hero-image.jpeg"} alt={"Hero Image"} fill={true} quality={100}/>
      </div>

      <div
        className="absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center  bg-[rgba(0,20,30,.5)] text-white">

        <div
          className="max-w-[75rem] flex flex-col gap-4 items-center justify-center text-center p-2"
        >

          <motion.p
            initial={{opacity: 0, y: -20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{ once: true, amount: .5 }}
            exit={{opacity: 0}}
            transition={{duration: .5, delay: .5}}
          >
            Master the Norwegian Language
          </motion.p>
          <motion.h2
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{ once: true, amount: .5 }}
            exit={{opacity: 0}}
            transition={{duration: .5}}
            className="text-6xl font-semibold"
          >
            Unlock Your Future with Learn Norsk
          </motion.h2>
          <motion.h1
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{ once: true, amount: .5 }}
            exit={{opacity: 0}}
            transition={{duration: .5, delay: .5}}
            className="max-w-[55rem]"
          >
            Join our vibrant community and explore the rich nuances of the Norwegian language and culture with
            interactive lessons that empower every learner.
          </motion.h1>
          <motion.button
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{ once: true, amount: .5 }}
            exit={{opacity: 0}}
            transition={{duration: .5, delay: 1}}
            className="submit-btn2"
          >
            Start Learning Now
          </motion.button>
        </div>


      </div>

    </div>
  );
};

export default Hero;