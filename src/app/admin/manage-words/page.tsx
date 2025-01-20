import React from 'react';
import AddWords from "@/components/admin/words/AddWords";
import WordSearch from "@/components/admin/words/WordSearch";
import UpdateWord from "@/components/admin/words/UpdateWord";
import DeleteWord from "@/components/admin/words/DeleteWord";

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