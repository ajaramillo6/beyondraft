"use client";

import { 
    Archive, 
    ChevronDown, 
    Files, 
    LayoutGrid,  
    Settings 
} from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/app/context_";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";

export interface FILE {
  _id: Id<"files">;
  _creationTime: number;
  isPublished?: boolean;
  fileName: string;
  projectId: string;
  createdBy: string;
  dateModified: number;
  document: string;
  whiteboard: string;
  isArchive: boolean;
}

export interface PROJECT {
  _id: Id<"projects">;
  createdBy: string;
  projectName: string;
}

const SideNavTop = (
    { 
        user, 
        setActiveProjectInfo 
    }
    : { 
        user: any; 
        setActiveProjectInfo: Function 
    }
) => {
  const convex = useConvex();
  const router = useRouter();
  const {
    showArchive,
    setShowArchive,
    projectList,
    setProjectList,
    activeProject,
    setActiveProject,
  } = useAppContext();

  const menu = [
    { id: 1, name: "Create Project", path: "/projects/create", icon: Files },
    { id: 2, name: "Settings", path: "/settings", icon: Settings },
  ];

  useEffect(() => {
    if (user) getProjectList();
  }, [user]);

  useEffect(() => {
    if (activeProject) setActiveProjectInfo(activeProject);
  }, [activeProject]);

  const getProjectList = async () => {
    const result = await convex.query(api.projects.getUserProjects, { createdBy: user.id });
    setProjectList(result);
    setActiveProject(result[0]);
  };

  const handleMenuClick = (item: { path: string }) => {
    if (item.path) router.push(item.path);
  };

  const buttonClass = (isActive: boolean) =>
    `w-full justify-start gap-2 font-bold mt-4 ${
      isActive ? 
      "bg-blue-700 dark:bg-blue-700 text-white hover:bg-blue-700" 
      : "bg-gray-100 dark:bg-gray-900"
    }`;

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-3 hover:bg-gray-200 
          dark:hover:bg-gray-900 p-3 rounded-lg cursor-pointer">
            <Image 
              src="/1.svg" 
              alt="logo" 
              height={30} 
              width={30}
              priority
            />
            <div className="flex gap-1 items-center min-w-0">
                <h2 className="font-bold text-[15px] truncate">
                    {activeProject?.projectName}
                </h2>
                <ChevronDown />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="ml-7 p-4">
          <div>
            {projectList?.map((project: PROJECT) => (
              <h2
                key={project._id}
                className={`text-sm font-bold p-2 hover:bg-blue-700 
                    hover:text-white rounded-lg mb-1 cursor-pointer ${
                  activeProject?._id === project._id ? "bg-blue-700 text-white" : ""
                }`}
                onClick={() => setActiveProject(project)}
              >
                {project.projectName}
              </h2>
            ))}
          </div>
          <Separator className="my-2" />
          <div>
            {menu.map((item) => (
              <h2
                key={item.id}
                className="flex gap-2 items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-900 
                rounded-lg text-sm cursor-pointer"
                onClick={() => handleMenuClick(item)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </h2>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Link href="/dashboard">
        <Button 
            variant={!showArchive ? "default" : "outline"} 
            className={buttonClass(!showArchive)} 
            onClick={() => setShowArchive(false)}
        >
          <LayoutGrid className="h-5 w-5" />
          All Files
        </Button>
      </Link>

      <Link href={{ pathname: "/dashboard", query: { archive: true } }}>
        <Button 
            variant={showArchive ? "default" : "outline"} 
            className={buttonClass(showArchive)} 
            onClick={() => setShowArchive(true)}
        >
          <Archive className="h-5 w-5" />
          Archive
        </Button>
      </Link>
    </div>
  );
};

export default SideNavTop;
