import React, { useState } from "react";
import { useAppContext } from "@/app/context_";
import { useAuth } from "@/app/context_/AuthContext";
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
import { Plus } from "lucide-react";
import { toast } from "sonner";

const NewFileBtn = () => {
  const { user } = useAuth();
  const { setFileList, activeProject } = useAppContext();
  const convex = useConvex();
  const { mutate, pending } = useApiMutation(api.files.createFile);
  const [fileInput, setFileInput] = useState("");

  // Handle file creation
  const onFileCreate = async () => {
    if (!fileInput.trim()) return;

    try {
      await mutate({
        fileName: fileInput,
        projectId: activeProject?._id,
        createdBy: user.id,
        isArchive: false,
        isPublished: false,
        document: "",
        whiteboard: "",
        dateModified: Date.now(),
      });

      await fetchFiles();
      toast.success("File created successfully!");
      setFileInput(""); // Clear the input field
    } catch (error) {
      console.error("Error creating file:", error);
      toast.error("Failed to create file.");
    }
  };

  // Fetch and update file list
  const fetchFiles = async () => {
    if (activeProject) {
      const projectFiles = await convex.query(api.files.getFiles, {
        projectId: activeProject._id,
      });
      setFileList(projectFiles);
    }
  };

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex justify-start md:justify-center items-center gap-1 h-8 p-4 border border-gray-300 dark:border-gray-800 
                       md:hover:border-blue-700 md:dark:hover:border-blue-700 
                       md:bg-gray-200 sm:dark:bg-gray-800 md:dark:bg-gray-900 hover:bg-blue-700 dark:hover:bg-blue-700 
                       md:text-black hover:text-white md:dark:text-white"
          >
            <Plus className="h-4 w-4" />
            New File
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              <Input
                placeholder="Enter File Name"
                className="mt-3 w-full"
                value={fileInput}
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
                onClick={onFileCreate}
              >
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewFileBtn;
