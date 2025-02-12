"use client";

import SideNavTop from "./SideNavTop";
import SideNavBottom from "./SideNavBottom";
import { useAppContext } from "@/app/context_";
import { useAuth } from "@/app/context_/AuthContext";

const SideNav = () => {
  const { user } = useAuth();
  const { setActiveProject } = useAppContext();

  return (
    <div className="h-full flex flex-col justify-between fixed w-72 border-r p-6">
      <div className="flex-1">
        <SideNavTop user={user} setActiveProjectInfo={setActiveProject} />
      </div>
      <SideNavBottom />
    </div>
  );
};

export default SideNav;
