"use client";

import { useEffect, useRef, useState, Suspense, lazy, useCallback } from "react";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import Spinner from "../../../_components/Spinner";
import dynamic from "next/dynamic";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useAppContext } from "@/app/context_";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@/app/context_/AuthContext";
import { useWorkspace } from "../../../context_/WorkspaceContext";

const WorkspaceHeader = lazy(() => import("../_components/WorkspaceHeader"));
const Editor = dynamic(() => import("../_components/Editor"), { suspense: true, ssr: false });
const Canvas = dynamic(() => import("../_components/Canvas"), { suspense: true, ssr: false });

interface WorkspacePageProps {
  params: {
    fileId: Id<"files">;
  };
}

const WorkspacePage: React.FC<WorkspacePageProps> = ({ params }) => {
  const convex = useConvex();

  const { mutate } = useApiMutation(api.files.updateFileName);

  const { user } = useAuth();
  const { fileData, setFileData } = useAppContext();
  const { showEditor, showCanvas, showBoth, onSaveTrigger } = useWorkspace();

  const canvasRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isResizingRef = useRef(false);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(fileData?.fileName || "Untitled");

  const fetchFileData = useCallback(async () => {
    if (!params.fileId) return;
    
    const result = await convex.query(api.files.getFileById, { _id: params.fileId });
    
    if (JSON.stringify(result) !== JSON.stringify(fileData)) {
      setFileData(result);
    }
  }, [params.fileId, convex, setFileData]);
  
  useEffect(() => {
    fetchFileData();
  }, [params.fileId, showEditor, showCanvas, showBoth, onSaveTrigger]);  
  
  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    const newWidth = (event.clientX / window.innerWidth) * 100;
    if (editorRef.current) {
      const clampedWidth = Math.min(Math.max(newWidth, 35), 65);
      if (editorRef.current.style.width !== `${clampedWidth}%`) {
        editorRef.current.style.width = `${clampedWidth}%`;
      }
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const enableInput = () => {
    setIsEditing(true);
    setTimeout(() => {
      setValue(fileData?.fileName || "Untitled");
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (newValue: string) => {
    if (newValue === value) return;
    setValue(newValue);
    mutate({
      _id: fileData?._id || "",
      createdBy: user.id,
      fileName: newValue || "Untitled",
      dateModified: Date.now(),
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
      fetchFileData();
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white dark:bg-neutral-950 shadow">
        <WorkspaceHeader
          isEditing={isEditing}
          value={value}
          enableInput={enableInput}
          disableInput={disableInput}
          onInput={onInput}
          onKeyDown={onKeyDown}
          inputRef={inputRef}
        />
      </div>
      <div className="flex flex-col h-full md:flex-row md:h-screen">
        {(showBoth || showEditor) && (
          <Suspense fallback={<Spinner />}>
            <aside
              className={`h-full ${showBoth ? "relative" : ""}`}
              style={{ width: showBoth ? "35%" : "100%" }}
              ref={editorRef}
            >
              {showBoth && (
                <div
                  onMouseDown={handleMouseDown}
                  className="opacity-0 hover:opacity-100 transition cursor-ew-resize 
                  h-full w-2 bg-gray-200 dark:bg-gray-800 absolute right-0 top-0 z-50 hidden md:block"
                />
              )}
              <Editor fileId={params.fileId} />
            </aside>
          </Suspense>
        )}
        {(showBoth || showCanvas) && (
          <Suspense fallback={<Spinner />}>
            <div
              className="h-full flex-grow border-l overflow-auto"
              style={{ width: "100%" }}
              ref={canvasRef}
            >
              {fileData && (
                <Canvas
                  fileId={params.fileId}
                  fileData={fileData}
                />
              )}
            </div>
          </Suspense>
        )}
      </div>
    </>
  );
};

export default WorkspacePage;