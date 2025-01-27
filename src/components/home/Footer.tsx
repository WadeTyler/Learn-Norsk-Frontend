import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className={"w-full h-[30rem] pt-36 flex items-center justify-center bg-background3 text-white"}>

      <div className="max-w-[75rem] flex items-center justify-center gap-8">

        <div className="flex flex-col gap-4 w-1/2">
          <h5 className="font-bold">About Us</h5>
          <p>Learn Norsk is your go-to platform for mastering the Norwegian language and culture.</p>
        </div>

        <div className="flex flex-col gap-4 w-1/2">
          <h5 className="font-bold">Menu</h5>
          <ol className="flex flex-col gap-2">
            <Link href="/" className="hover:text-accent duration-300">Home</Link>
            <Link href="/about" className="hover:text-accent duration-300">About</Link>
            <Link href="/learn" className="hover:text-accent duration-300">Learn</Link>
            <Link href="/profile" className="hover:text-accent duration-300">Profile</Link>
            <Link href="/contact" className="hover:text-accent duration-300">Contact</Link>
          </ol>
        </div>

      </div>
    </div>
  );
};

export default Footer;