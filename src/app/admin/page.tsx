import React from 'react';
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col">
      <h1>Admin Page</h1>
      <Link href={"/admin/manage-words"}>Manage Words</Link>
      <Link href={"/admin/manage-questions"}>Manage Questions</Link>
    </div>
  );
};

export default Page;