"use client";

import React from "react";
import { useAuth } from "@/app/context_/AuthContext";
import { ModeToggle } from "@/components/ui/modeToggle";
import SearchBar from "./SearchBar";
import NewFileBtn from "./NewFileBtn";
import UserBtn from "./UserBtn";

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="ml-6 md:ml-0 flex flex-nowrap justify-between items-center">
      {/* New File Button */}
      <div className="hidden md:flex">
        <NewFileBtn />
      </div>
      {/* Search Bar */}
      <div className="flex-grow">
        <SearchBar type="files" />
      </div>

      {/* User Avatar */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        {user?.picture && (
          <UserBtn />
        )}
      </div>
    </div>
  );
};

export default Header;
