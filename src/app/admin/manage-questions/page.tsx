import React from 'react';
import CreateQuestion from "@/components/admin/questions/CreateQuestion";
import SearchQuestions from "@/components/admin/questions/SearchQuestions";

const Page = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center gap-4 p-16">
      <h1 className="font-semibold text-2xl">Manage Questions</h1>
      <div className="flex gap-4 justify-center">
        <SearchQuestions />
        <CreateQuestion />
      </div>
    </div>
  );
};

export default Page;