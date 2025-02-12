"use client";

import { ModeToggle } from "@/components/ui/modeToggle";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import React from "react";
import SearchBar from "../../dashboard/_components/SearchBar";
import UserBtn from "../../dashboard/_components/UserBtn";
import { useAuth } from "@/app/context_/AuthContext";
import SidebarAlt from "../../../_components/SideNavAlt";

const SettingsHeader = () => {

    const { user } = useAuth();

  return (
    <header className="flex flex-nowrap justify-between items-center p-6 mt-1">
      <SidebarAlt />
      {/* Left Section: Back Navigation and Logo */}
      <div className="hidden md:flex items-center gap-4 mr-4">
        <a href="/dashboard" className="flex items-center gap-2 text-sm">
          <ChevronLeft className="text-gray-600 dark:text-gray-400" />
          <Image 
            src="/1.svg" 
            alt="logo" 
            height={30} 
            width={30}
            priority
          />
        </a>
        <div className="h-6 w-px bg-gray-500" />
        <h1 className="font-bold text-lg">Settings</h1>
      </div>
      {/* Search Bar */}
      <div className="ml-6 md:ml-0 flex-grow">
        <SearchBar type="projects" />
      </div>

      {/* User Avatar */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        {user?.picture && (
          <UserBtn />
        )}
      </div>
    </header>
  );
};

export default SettingsHeader;
