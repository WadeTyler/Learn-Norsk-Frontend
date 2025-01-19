import React from 'react';
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <h1>Admin Page</h1>
      <Link href={"/admin/manage-words"}>Manage Words</Link>
    </div>
  );
};

export default Page;