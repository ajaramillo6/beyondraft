"use client";

import { useAppContext } from "@/app/context_";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useConvex } from "convex/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/app/context_/AuthContext";

interface EmptyFilesProps {
  query: {
    search?: string;
    archive?: string;
  };
}

const EmptyFiles = ({ query }: EmptyFilesProps) => {
  const { user } = useAuth();
  const convex = useConvex();
  const [fileInput, setFileInput] = useState("");
  const { mutate, pending } = useApiMutation(api.files.createFile);
  const { activeProject, setFileList } = useAppContext();

  const onFileCreate = async (fileName: string) => {
    try {
      await mutate({
        fileName,
        projectId: activeProject?._id,
        createdBy: user.id,
        isArchive: false,
        document: "",
        whiteboard: "",
        isPublished: false,
        dateModified: Date.now(),
      });
      await getFiles();
      toast.success("File created");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create file");
    }
  };

  const getFiles = async () => {
    if (!query.archive && activeProject) {
      const projectFiles = await convex.query(api.files.getFiles, {
        projectId: activeProject._id,
      });
      setFileList(projectFiles);
    } else if (query.archive) {
      const archivedFiles = await convex.query(api.files.getArchive);
      setFileList(archivedFiles);
    }
  };

  return (
    <div className="flex flex-col items-center mt-28 mx-auto max-w-3xl text-center">
      {/* Header */}
      <h1 className="font-bold mb-5 text-lg">Welcome to Beyondraft</h1>
      
      {/* Image */}
      <Image
        src="/elements2.svg"
        alt="No files"
        height={200}
        width={200}
        className="object-contain"
        priority
      />
      
      {/* Dialog for creating new file */}
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button
            className="flex w-max mt-5 items-center gap-1 h-8 px-4 border border-blue-700 
                       dark:border-blue-700 bg-blue-700 dark:bg-blue-700 
                       hover:bg-blue-600 text-white hover:scale-105 transition-transform"
          >
            Create New File
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              <Input
                placeholder="Enter File Name"
                className="mt-3"
                onChange={(e) => setFileInput(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-blue-800 text-white hover:bg-blue-700 w-full"
                disabled={pending || fileInput.length <= 3}
                onClick={() => onFileCreate(fileInput)}
              >
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Additional Info */}
      <p className="mx-auto mt-4 text-sm text-gray-400">
        Get started by creating your first file
      </p>
    </div>
  );
};

export default EmptyFiles;
