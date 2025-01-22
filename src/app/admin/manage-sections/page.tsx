import React from 'react';
import SearchSections from "@/components/admin/sections/SearchSections";
import CreateSection from "@/components/admin/sections/CreateSection";


const Page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-4 p-16 pt-32">
      <h1 className="font-semibold text-2xl">Manage Sections</h1>
      <div className="w-full flex gap-8 justify-center flex-wrap">
        <SearchSections />
        <CreateSection />
      </div>
    </div>
  );
};

export default Page;