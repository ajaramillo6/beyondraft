"use client";

import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Spinner from "@/app/_components/Spinner";
import { 
    Edit, 
    MoreHorizontal, 
    Trash2 
} from "lucide-react";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRenameProjectModal } from "@/store/use-rename-project-modal";
import { useAppContext } from "@/app/context_";
import { useDeleteProjectModal } from "@/store/use-delete-project-modal";
import { useAuth } from "@/app/context_/AuthContext";
import { PROJECT } from "../../dashboard/_components/SideNavTop";
import EmptyProjectSearch from "./EmptyProjectSearch";
import EmptyProjects from "./EmptyProjects";


interface ProjectListProps {
  query: {
    search?: string;
  };
}

const ProjectsList = ({ query }: ProjectListProps) => {
  const { user } = useAuth();
  const convex = useConvex();
  const { projectList, setProjectList } = useAppContext();
  const { onOpen } = useRenameProjectModal();
  const { onOpenDelete } = useDeleteProjectModal();
  const [loading, setLoading] = useState(true);
  const [projectInput, _] = useState("");

  const fetchProjectList = async () => {
    try {
      const result = await convex.query(api.projects.getUserProjects, {
        createdBy: user.id,
        search: query.search,
      });
      setProjectList(result);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.search || user) {
      fetchProjectList();
    }
  }, [query.search, user]);

  if (!projectList?.length) {
    if (query.search) return <EmptyProjectSearch query={query} />;
    return (
      <EmptyProjects />
    );
  }

  return (
    <>
    <h1 className="md:hidden font-bold mb-4">Settings</h1>
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Project Name</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      {loading ? (
        <TableBody>
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={2} className="text-center">
              <Spinner />
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody>
          {projectList.map((project: PROJECT) => (
            <TableRow key={project._id} className="hover:bg-transparent">
              <TableCell>{project.projectName}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-4">
                    <DropdownMenuItem
                      className="cursor-pointer flex items-center gap-4 text-sm p-1.5 
                      hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-sm"
                      onClick={() => onOpen(project.projectName, project._id, projectInput)}
                    >
                      <Edit className="h-4 w-4" /> Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer flex items-center gap-4 text-sm p-1.5 
                      hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-sm"
                      onClick={() => onOpenDelete(project._id)}
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
    </>
  );
};

export default ProjectsList;
