import React from 'react';
import CreateQuestion from "@/components/admin/questions/CreateQuestion";
import SearchQuestions from "@/components/admin/questions/SearchQuestions";
import DeleteQuestion from "@/components/admin/questions/DeleteQuestion";

const Page = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center gap-4 p-16">
      <h1 className="font-semibold text-2xl">Manage Questions</h1>
      <div className="w-full flex gap-16 justify-center flex-wrap">
        <SearchQuestions />
        <CreateQuestion />
        <DeleteQuestion />
      </div>
    </div>
  );
};

export default Page;