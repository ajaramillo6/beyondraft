"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/app/context_/AuthContext";

const CreateProject = () => {
  const { user } = useAuth();
  const [projectName, setProjectName] = useState("");
  const createProject = useMutation(api.projects.createProject);
  const router = useRouter();

  const handleCreateProject = async () => {
    try {
      await createProject({
        projectName,
        createdBy: user?.id,
      });
      toast("Project created");
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to create project:", error);
      toast("Failed to create project");
    }
  };

  return (
    <div className="h-screen flex flex-col px-6 md:px-16">
      {/* Header Section */}
      <div className="flex items-center gap-2 mt-6">
        <a
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg text-sm"
          href="/dashboard"
        >
          <ChevronLeft className="text-gray-600 dark:text-gray-400" />
        </a>
        <Image src="/logo.svg" alt="logo" height={30} width={30} />
        <span className="text-lg font-bold">Beyondraft</span>
      </div>
  
      {/* Main Content */}
      <div className="flex flex-auto flex-col items-center justify-center">
        <h2 className="font-bold text-2xl md:text-[40px] py-3">
          What should we call your project?
        </h2>
        <p className="text-muted-foreground">
          You can always change this later from settings.
        </p>
  
        {/* Project Name Input */}
        <div className="flex flex-col mt-3 w-full items-center">
          <Input
            placeholder="Enter Project Name"
            className="text-center mt-3 w-full md:w-6/12"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
  
        {/* Create Button */}
        <Button
          className="border border-blue-700 bg-transparent text-black 
          dark:bg-gray-900 mt-9 w-full md:w-6/12 dark:text-white hover:text-white 
          hover:bg-blue-700 dark:hover:bg-blue-700"
          disabled={!projectName.trim()}
          onClick={handleCreateProject}
        >
          Create Project
        </Button>
      </div>
    </div>
  );
}  

export default CreateProject;
