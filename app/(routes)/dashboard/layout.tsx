"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/app/context_/AuthContext";
import SideNav from "./_components/SideNav";
import { MenuIcon } from "lucide-react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const convex = useConvex();
  const router = useRouter();

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      checkProject();
    }
  }, [isAuthenticated, user]);

  const checkProject = async () => {
    if (!user) return;

    try {
      const projects = await convex.query(api.projects.getUserProjects, {
        createdBy: user.id,
      });

      if (!projects?.length) {
        router.push("/projects/create");
      }
    } catch (error) {
      console.error("Error checking project:", error);
    }
  };

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
    <div className="relative">
      <button
        className="md:hidden fixed top-9 left-4 z-10"
        onClick={() => setSidebarVisible(!isSidebarVisible)}
      >
        <MenuIcon />
      </button>
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-72 bg-white dark:bg-neutral-950 
          z-20 transform transition-transform ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <SideNav />
      </aside>
      <main className="ml-0 md:ml-72">{children}</main>
    </div>
  );
};

export default DashboardLayout;
