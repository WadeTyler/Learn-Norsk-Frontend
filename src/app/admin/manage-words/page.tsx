import React from 'react';
import AddWords from "@/components/admin/AddWords";
import WordSearch from "@/components/admin/WordSearch";
import UpdateWord from "@/components/admin/UpdateWord";
import DeleteWord from "@/components/admin/DeleteWord";

const Page = () => {
  return (
    <div className={"w-full h-screen flex justify-center gap-4 p-16"}>
      <WordSearch />
      <AddWords />
      <div className="flex flex-col gap-4">
        <UpdateWord />
        <DeleteWord />
      </div>
    </div>
  );
};

export default Page;