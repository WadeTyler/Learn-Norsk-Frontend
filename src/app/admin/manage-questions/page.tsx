import React from 'react';
import CreateQuestion from "@/components/admin/questions/CreateQuestion";

const Page = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center gap-4 p-16">
      <h1 className="font-semibold text-2xl">Manage Questions</h1>
      <CreateQuestion />
    </div>
  );
};

export default Page;