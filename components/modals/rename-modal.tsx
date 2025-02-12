"use client";

import { useRenameModal } from "@/store/use-rename-modal";
import { useApiMutation } from "@/hooks/use-api-mutation";

import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { FormEventHandler, useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useAppContext } from "@/app/context_";
import { useConvex } from "convex/react";
import { useAuth } from "@/app/context_/AuthContext";

export const RenameModal = () => {
  const { user } = useAuth();
  const { mutate, pending } = useApiMutation(api.files.updateFileName);
  const { showArchive, setFileList, activeProject } = useAppContext();
  const convex = useConvex();

  const {
    isOpen,
    onClose,
    initialValues,
  } = useRenameModal((state) => state);

  const [fileInput, setFileInput] = useState(initialValues.fileName);

  // Fetch files based on project or archive state
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

  useEffect(() => {
    setFileInput(initialValues.fileName);
  }, [initialValues.fileName]);

  // Handle form submission to rename the file
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutate({
      _id: initialValues._id,
      createdBy: user.id,
      fileName: fileInput,
      dateModified: Date.now(),
    })
      .then(() => {
        getFiles();
        toast.success("File renamed");
        onClose();
      })
      .catch(() => toast.error("Failed to rename file"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={fileInput}
            onChange={(e) => setFileInput(e.target.value)}
            placeholder="Enter new name"
          />
          <DialogFooter>
            <Button
              type="submit"
              className="bg-blue-800 text-white dark:text-white hover:bg-blue-700 w-full"
              disabled={fileInput.length <= 3 || pending}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
