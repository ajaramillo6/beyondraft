import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuGroup 
} from "@/components/ui/dropdown-menu";
import { 
  Edit, 
  Archive, 
  ArchiveRestore, 
  Trash2, 
  MoreHorizontal 
} from "lucide-react";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter, 
  DialogClose 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DropdownMenuProps {
  file: {
    _id: string;
    fileName: string;
  };
  query: {
    archive?: string;
  };
  onOpen: (
    fileName: string, 
    fileId: string, 
    action: string, 
    timestamp: number
  ) => void;
  onOpenDelete: (fileId: string) => void;
  handleArchive: (e: React.MouseEvent, fileId: string) => void;
  pending: boolean;
}

const CustomDropdownMenu: React.FC<DropdownMenuProps> = ({ 
  file, 
  query, 
  onOpen, 
  onOpenDelete, 
  handleArchive, 
  pending 
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none cursor-pointer">
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onOpen(file.fileName, file._id, "", Date.now())}>
          <div className="flex items-center gap-2 cursor-pointer">
            <Edit className="h-4 w-4" />
            <span>Rename</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="w-full hover:bg-neutral-100 p-2 dark:hover:bg-neutral-800 rounded-sm">
                  <div className="flex items-center gap-2">
                    {query.archive ? (
                      <ArchiveRestore className="h-4 w-4" />
                    ) : (
                      <Archive className="h-4 w-4" />
                    )}
                    <span className="text-sm">{query.archive ? "Restore" : "Archive"}</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>{query.archive ? "Restore File" : "Archive File"}</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to {query.archive ? "restore" : "archive"} this file?
                  </DialogDescription>
                  <DialogFooter>
                    <Button
                      className="bg-blue-800 text-white dark:text-white hover:bg-blue-700 w-full"
                      onClick={(e) => handleArchive(e, file._id)}
                      disabled={pending}
                    >
                      {query.archive ? "Restore" : "Archive"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuItem onClick={() => onOpenDelete(file._id)}>
          <div className="flex items-center gap-2 cursor-pointer">
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropdownMenu;
