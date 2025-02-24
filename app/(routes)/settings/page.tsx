"use client";

import React from "react";
import Profile from "./_components/Profile";
import ProjectsList from "./_components/ProjectsList";
import SettingsHeader from "./_components/SettingsHeader";
import { useSearchParams } from "next/navigation";

const SettingsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? undefined;

  return (
    <div>
      <SettingsHeader />
      <div className="flex">
        {/* Profile Section */}
        <aside className="hidden md:block basis-1/3 p-10">
          <Profile />
        </aside>
        {/* Projects List Section */}
        <main className="basis-full md:basis-2/3 p-6">
          <ProjectsList query={{ search }} />
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
