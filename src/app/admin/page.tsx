
'use client';
import React from 'react';
import Link from "next/link";
import {useAdminProtected} from "@/hooks/useAdminProtected";
import {LoadingLG} from "@/components/util/Loading";

const Page = () => {

  const { isCheckingAdmin } = useAdminProtected();
  if (isCheckingAdmin) return <LoadingLG />;

  return (
    <div className="flex flex-col pt-16 h-screen">
      <h1>Admin Page</h1>
      <Link href={"/admin/manage-words"}>Manage Words</Link>
      <Link href={"/admin/manage-questions"}>Manage Questions</Link>
      <Link href={"/admin/manage-lessons"}>Manage Lessons</Link>
      <Link href={"/admin/manage-sections"}>Manage Sections</Link>
    </div>
  );
};

export default Page;