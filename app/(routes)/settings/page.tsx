"use client";

import Profile from "./_components/Profile";
import ProjectsList from "./_components/ProjectsList";
import SettingsHeader from "./_components/SettingsHeader";

interface SettingsProps {
  searchParams: {
    search?: string;
  };
}

const SettingsPage: React.FC<SettingsProps> = ({ searchParams }) => {
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
          <ProjectsList query={searchParams} />
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
