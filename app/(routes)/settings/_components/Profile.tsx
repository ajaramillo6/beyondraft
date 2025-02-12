"use client";

import Image from "next/image";
import React from "react";
import { useAuth } from "@/app/context_/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-3 border-l border-neutral-300 
    dark:border-neutral-700 p-5">
      {user?.picture && (
        <Image
          src={user.picture}
          alt="User Profile Picture"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      )}
      <div className="text-muted-foreground text-sm">
        <h1 className="font-bold">
          {user?.given_name} {user?.family_name}
        </h1>
        <h2>{user?.email}</h2>
      </div>
    </div>
  );
};

export default Profile;
