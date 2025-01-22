import React from 'react';
import CreateLesson from "@/components/admin/lessons/CreateLesson";
import SearchQuestions from "@/components/admin/questions/SearchQuestions";
import SearchLessons from "@/components/admin/lessons/SearchLessons";
import DeleteLesson from "@/components/admin/lessons/DeleteLesson";

const Page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-4 p-16 pt-32">
      <h1 className="font-semibold text-2xl">Manage Lessons</h1>
      <div className="w-full flex gap-16 justify-center flex-wrap">
        <SearchLessons />
        <CreateLesson />
        <SearchQuestions />
        <DeleteLesson />
      </div>
    </div>
  );
};

export default Page;