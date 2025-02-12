"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import Spinner from "@/app/_components/Spinner";
import { useRenameModal } from "@/store/use-rename-modal";
import { useDeleteModal } from "@/store/use-delete-modal";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useAppContext } from "@/app/context_";
import EmptySearch from "./EmptySearch";
import EmptyArchive from "./EmptyArchive";
import EmptyFiles from "./EmptyFiles";
import { useConvex } from "convex/react";
import CustomDropdownMenu from "./CustomDropdownMenu";

interface FileListProps {
  query: {
    search?: string;
    archive?: string;
  };
}

const FileList = ({ query }: FileListProps) => {
  const router = useRouter();
  const convex = useConvex();
  const { mutate, pending } = useApiMutation(api.files.archiveFile);
  const { setShowArchive, fileList, setFileList, activeProject } = useAppContext();
  const { onOpen } = useRenameModal();
  const { onOpenDelete } = useDeleteModal();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(!fileList);
  }, [fileList]);

  useEffect(() => {
    if (query.search || activeProject) {
      fetchFiles();
    }
  }, [query.search, activeProject, query.archive]);

  useEffect(() => {
    setShowArchive(!!query.archive);
  }, [query.archive, setShowArchive]);

  const fetchFiles = async () => {
    if (query.archive) {
      const archivedFiles = await convex.query(api.files.getArchive);
      setFileList(archivedFiles);
    } else if (activeProject) {
      const projectFiles = await convex.query(api.files.getFiles, {
        projectId: activeProject._id,
        search: query.search,
      });
      setFileList(projectFiles);
    }
  };

  const handleArchive = async (e: React.MouseEvent, fileId: string) => {
    e.preventDefault();
    const isArchiving = !query.archive;

    try {
      await mutate({ _id: fileId, isArchive: isArchiving });
      fetchFiles();
      toast.success(isArchiving ? "File archived successfully" : "File restored successfully");
    } catch {
      toast.error(isArchiving ? "Failed to archive file" : "Failed to restore file");
    }
  };

  if (!fileList?.length) {
    if (query.search) return <EmptySearch query={query} />;
    if (query.archive) return <EmptyArchive />;
    return <EmptyFiles query={query} />;
  }

  return (
    <div className="overflow-x-auto mt-10 min-w-full">
      <h1 className="font-bold mb-4">{query.archive ? "Archive" : "All Files"}</h1>

      <Table className="table-auto w-full">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="hover:bg-transparent">File Name</TableHead>
            <TableHead className="hidden sm:table-cell hover:bg-transparent">Created At</TableHead>
            <TableHead className="hidden sm:table-cell hover:bg-transparent">Edited At</TableHead>
            <TableHead className="hidden sm:table-cell hover:bg-transparent" />
          </TableRow>
        </TableHeader>

        {loading ? (
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell>
                <Spinner />
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {fileList.map((file, index) => (
              <TableRow key={file._id} className="hover:bg-transparent">
                <TableCell
                  className="font-bold cursor-pointer hover:text-blue-700"
                  onClick={() => router.push(`/workspace/${file._id}`)}
                >
                  {file.fileName}
                </TableCell>
                <TableCell 
                  className="hidden sm:table-cell"
                >
                  {moment(file._creationTime).format("DD MMM YYYY")}
                </TableCell>
                <TableCell 
                  className="hidden sm:table-cell"
                >
                  {moment(file.dateModified).format("DD MMM YYYY")}
                </TableCell>
                <TableCell>
                  <CustomDropdownMenu
                    file={file}
                    query={query}
                    onOpen={onOpen}
                    onOpenDelete={onOpenDelete}
                    handleArchive={handleArchive}
                    pending={pending}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default FileList;
