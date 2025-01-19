import React from 'react';
import AddWords from "@/components/admin/AddWords";
import WordSearch from "@/components/admin/WordSearch";

const Page = () => {
  return (
    <div className={"w-full h-screen flex justify-center gap-4 p-16"}>
      <WordSearch />
      <AddWords />

    </div>
  );
};

export default Page;