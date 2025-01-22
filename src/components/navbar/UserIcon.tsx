'use client';
import React, {useEffect, useRef, useState} from 'react';
import {IconUserFilled, IconUser, IconLogout} from "@tabler/icons-react";
import Link from "next/link";
import {useUserStore} from "@/stores/userStore";
import {LoadingSM} from "@/components/util/Loading";

const UserIcon = () => {

  const [clicked, setClicked] = useState<boolean>(false);
  const userIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userIconRef.current && !userIconRef.current.contains(event.target as Node)) {
        setClicked(false);
      }
    }

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    }
  }, []);

  const { logout, isLoggingOut } = useUserStore();

  const handleLogout = () => {
    logout();
    setClicked(false);
  }

  return (
    <div
      ref={userIconRef}
      className="bg-background flex items-center w-fit h-fit rounded-full p-2 relative cursor-pointer text-primary hover:bg-accent hover:text-background duration-300"
      onClick={() => setClicked(prev => !prev)}
    >
      <IconUserFilled />

      {clicked && (
        <div className="bg-background w-32 flex items-center flex-col gap-2 absolute left-1/2 -translate-x-1/2 top-full translate-y-2 shadow-xl p-2 rounded">
          <Link href={"/profile"} className="dropdown-btn"><IconUser /> Profile</Link>
          <button onClick={handleLogout} className="dropdown-btn" disabled={isLoggingOut}>{!isLoggingOut ? <><IconLogout /> Logout</> : <LoadingSM /> }</button>
        </div>
      )}

    </div>
  );
};

export default UserIcon;