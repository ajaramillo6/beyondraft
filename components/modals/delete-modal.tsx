"use client";

import { FormEventHandler } from "react";
import { useDeleteModal } from "@/store/use-delete-modal";
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
import { toast } from "sonner";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAppContext } from "@/app/context_";
import { useAuth } from "@/app/context_/AuthContext";

export const DeleteModal = () => {
  const { user } = useAuth();
  const { mutate, pending } = useApiMutation(api.files.deleteFileById);
  const { showArchive, setFileList, activeProject } = useAppContext();
  const convex = useConvex();
  
  const getFiles = async () => {
    if (!showArchive && activeProject) {
      const projectFiles = await convex.query(api.files.getFiles, {
        projectId: activeProject._id,
      });
      setFileList(projectFiles);
    } else if (showArchive) {
      const archivedFiles = await convex.query(api.files.getArchive);
      setFileList(archivedFiles);
    }
  };
  

  const { isOpen, onCloseDelete, initialValues } = useDeleteModal((state) => state);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutate({
      _id: initialValues._id,
      createdBy: user.id,
    })
      .then(() => {
        getFiles();
        toast.success("File deleted");
        onCloseDelete();
      })
      .catch(() => toast.error("Failed to delete file"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseDelete}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete File</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to permanently delete this file and all its contents?
        </DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <DialogFooter>
            <Button
              type="submit"
              className="bg-red-800 text-white dark:text-white hover:bg-red-700 w-full"
              disabled={pending}
            >
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
