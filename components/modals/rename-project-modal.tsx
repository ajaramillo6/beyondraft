"use client";

import { useRenameProjectModal } from "@/store/use-rename-project-modal";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { 
    Dialog, 
    DialogContent, 
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

export const RenameProjectModal = () => {
    const { user } = useAuth();
    const { mutate, pending } = useApiMutation(api.projects.updateProjectName);
    const { setProjectList } = useAppContext();
    const convex = useConvex();

    const { isOpen, onClose, initialValues } = useRenameProjectModal((state) => state);
    const [projectInput, setProjectInput] = useState(initialValues.projectName);

    // Fetch projects based on the logged-in user
    const getProjects = async () => {
        try {
            const result = await convex.query(api.projects.getUserProjects, { createdBy: user.id });
            setProjectList(result);
        } catch (error) {
            console.error("Error fetching projects:", error);
            toast.error("Failed to fetch projects.");
        }
    };

    // Update project name input when modal is opened with new initial values
    useEffect(() => {
        setProjectInput(initialValues.projectName);
    }, [initialValues.projectName]);

    // Handle project name change submission
    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        mutate({ _id: initialValues._id, projectName: projectInput })
            .then(() => {
                getProjects();
                toast.success("Project renamed successfully.");
                onClose();
            })
            .catch((error) => {
                console.error("Error renaming project:", error);
                toast.error("Failed to rename project.");
            });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rename Project</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        disabled={pending}
                        required
                        maxLength={60}
                        value={projectInput}
                        onChange={(e) => setProjectInput(e.target.value)}
                        placeholder="Enter new name"
                    />
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="bg-blue-800 text-white dark:text-white hover:bg-blue-700 w-full"
                            disabled={projectInput.length <= 3 || pending}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
