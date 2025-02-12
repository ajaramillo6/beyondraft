"use client";

import { useDeleteProjectModal } from "@/store/use-delete-project-modal";
import { useApiMutation } from "@/hooks/use-api-mutation";

import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "../ui/dialog";
import { Button } from "../ui/button";

import { FormEventHandler } from "react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useConvex } from "convex/react";
import { useAppContext } from "@/app/context_";
import { useAuth } from "@/app/context_/AuthContext";

export const DeleteProjectModal = () => {
  const { user } = useAuth();
  const { mutate, pending } = useApiMutation(api.projects.deleteProjectbyId);
  const { mutate: deleteFile, pending: pendingFiles } = useApiMutation(api.files.deleteFileById);

  const { setProjectList } = useAppContext();
  const convex = useConvex();

  const { isOpen, onCloseDelete, initialValues } = useDeleteProjectModal(state => state);

  const getProjectFiles = async (projectId: string) => {
    return convex.query(api.files.getFiles, { projectId });
  };

  const getProjects = async () => {
    const projects = await convex.query(api.projects.getUserProjects, { createdBy: user.id });
    setProjectList(projects);
  };

  const handleFileDeletion = async (files: { _id: string }[]) => {
    await Promise.all(files.map(file => deleteFile({ _id: file._id, createdBy: user.id })));
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    
    try {
      const files = await getProjectFiles(initialValues._id);
      await handleFileDeletion(files || []);
      
      if (!pendingFiles) {
        await mutate({ _id: initialValues._id });
        await getProjects();
        toast.success("Project deleted");
        onCloseDelete();
      }
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseDelete}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to permanently delete this project and all its contents?
        </DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <DialogFooter>
            <Button
              type="submit"
              className="bg-red-800 text-white dark:text-white hover:bg-red-700 w-full"
              disabled={pending || pendingFiles}
            >
              Delete project with all files
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
