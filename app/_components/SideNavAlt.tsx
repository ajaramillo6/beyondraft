import { 
  LayoutDashboardIcon, 
  MenuIcon, 
  Settings 
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const SideNavAlt = () => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboardIcon,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Setting",
      icon: Settings,
      path: "/settings",
    },
  ];

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setSidebarVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-5 left-4 z-10"
        onClick={() => setSidebarVisible(!isSidebarVisible)}
      >
        <MenuIcon />
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed border-r border-gray-200 dark:border-gray-800 top-0 left-0 h-screen w-72 bg-white dark:bg-neutral-950 z-20 transform transition-transform ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } md:-translate-x-full lg:hidden`}
      >
        <div className="h-full w-full">
          {/* Logo Section */}
          <div className="flex items-center gap-3 p-3 rounded-lg">
            <Image 
              src="/1.svg" 
              alt="logo" 
              height={30} 
              width={30}
              priority
            />
            <h2 className="font-bold text-[15px]">
              Beyondraft
            </h2>
          </div>

          {/* Menu List */}
          {menuList.map(({ id, name, path, icon: Icon }) => (
            <Link href={path} key={id}>
              <h2
                className="flex items-center gap-2 p-2 text-sm mx-2 
                hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md cursor-pointer"
              >
                <Icon className="h-5 w-5 text-blue-700" />
                {name}
              </h2>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
};

export default SideNavAlt;
