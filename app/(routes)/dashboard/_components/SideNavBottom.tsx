"use client";

import { Flag, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import NewFileBtn from "./NewFileBtn";

const SideNavBottom = () => {
  const menuList = [
    {
      id: 1,
      name: "Getting Started",
      icon: Flag,
      path: "/gettingStarted",
    },
    {
      id: 2,
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <div>
      {/* New File Button for mobile screens */}
      <div className="flex mb-5 md:hidden w-full">
        <NewFileBtn />
      </div>

      {/* Menu List */}
      {menuList.map(({ id, name, path, icon: Icon }) => (
        <Link href={path} key={id}>
          <h2
            className="flex items-center gap-2 p-2 text-sm 
            hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md cursor-pointer"
          >
            <Icon className="h-5 w-5" />
            {name}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export default SideNavBottom;
