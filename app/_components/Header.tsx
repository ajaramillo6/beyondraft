"use client";

import { ModeToggle } from "@/components/ui/modeToggle";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { useAuth } from "../context_/AuthContext";
import SideNavAlt from "./SideNavAlt";

const Header = () => {
  const { isAuthenticated } = useAuth() || {};

  return (
    <header>
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center gap-2 ml-10 md:ml-0">
          <Image
            src="/1.svg"
            alt="Beyondraft logo"
            height={30}
            width={30}
            priority
          />
          <span className="text-lg font-bold">Beyondraft</span>
        </div>

        {/* Mode Toggle */}
        <ModeToggle />

        {/* Navigation and User Actions */}
        <div className="relative flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg text-sm"
                  href="/dashboard"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {!isAuthenticated && (
              <RegisterLink>
                <span className="hidden rounded-md bg-slate-100 px-5 py-2.5 text-sm font-medium text-red-500 transition dark:text-white hover:text-red-600 dark:hover:text-red-500 md:block dark:bg-slate-800 dark:hover:text-white/75">
                  Register
                </span>
              </RegisterLink>
            )}

            <SideNavAlt />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
