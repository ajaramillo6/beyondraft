"use client";

import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { useRouter } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import Spinner from "@/app/_components/Spinner";
import dynamic from "next/dynamic";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useAppContext } from "@/app/context_";
import { Id } from "@/convex/_generated/dataModel";

const WorkspaceHeader = lazy(() =>
  import("../../../../(routes)/workspace/_components/WorkspaceHeader")
);
const Editor = dynamic(
  () => import("../../../../(routes)/workspace/_components/Editor"),
  { suspense: true, ssr: false }
);
const Canvas = dynamic(
  () => import("../../../../(routes)/workspace/_components/Canvas"),
  { suspense: true, ssr: false }
);

interface PreviewPageProps {
  params: {
    fileId: Id<"files">;
  };
}

const PreviewPage: React.FC<PreviewPageProps> = ({ params }) => {
  const convex = useConvex();
  const router = useRouter();
  const { fileData, setFileData } = useAppContext();
  const { mutate } = useApiMutation(api.files.updateFileName);

  const canvasRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isResizingRef = useRef(false);

  const [triggerSave, setTriggerSave] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(fileData?.fileName || "Untitled");
  const [viewState, setViewState] = useState({
    showEditor: false,
    showCanvas: false,
    showBoth: true,
  });

  useEffect(() => {
    if (params.fileId) fetchFileData();
  }, [params.fileId]);

  const fetchFileData = async () => {
    try {
      const result = await convex.query(api.files.getFileById, {
        _id: params.fileId,
      });

      if (!result) {
        router.push("/404");
        return;
      }

      if (!result.isPublished) {
        router.push("/403");
        return;
      }

      if (result !== fileData) setFileData(result); // Only update if data is different
    } catch (error) {
      console.error("Error fetching file data:", error);
      router.push("/404");
    }
  };

  const handleResizeStart = (event: React.MouseEvent) => {
    event.preventDefault();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  const handleResize = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    const newWidth = Math.max(404, Math.min(800, event.clientX));
    if (editorRef.current) editorRef.current.style.width = `${newWidth}px`;
  };

  const handleResizeEnd = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleResize);
    document.removeEventListener("mouseup", handleResizeEnd);
  };

  const enableInput = () => {
    setIsEditing(true);
    setValue(fileData?.fileName || "Untitled");
    inputRef.current?.focus();
  };

  const disableInput = () => setIsEditing(false);

  const handleInput = (newValue: string) => {
    setValue(newValue);
    mutate({
      _id: fileData?._id,
      fileName: newValue || "Untitled",
      dateModified: Date.now(),
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
      fetchFileData();
    }
  };

  return (
    <div>
      <WorkspaceHeader
        preview
        onSave={() => setTriggerSave(!triggerSave)}
        showEditor={viewState.showEditor}
        setShowEditor={(showEditor) =>
          setViewState((prev) => ({ ...prev, showEditor }))
        }
        showCanvas={viewState.showCanvas}
        setShowCanvas={(showCanvas) =>
          setViewState((prev) => ({ ...prev, showCanvas }))
        }
        showBoth={viewState.showBoth}
        setShowBoth={(showBoth) =>
          setViewState((prev) => ({ ...prev, showBoth }))
        }
        isEditing={isEditing}
        value={value}
        enableInput={enableInput}
        disableInput={disableInput}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
      />

      <div className="flex relative overflow-x-hidden">
        {(viewState.showBoth || viewState.showEditor) && (
          <Suspense fallback={<Spinner />}>
            <aside
              className="h-screen"
              style={{ width: viewState.showBoth ? "500px" : "100%" }}
              ref={editorRef}
            >
              {viewState.showBoth && (
                <div
                  onMouseDown={handleResizeStart}
                  className="opacity-0 hover:opacity-100 transition cursor-ew-resize 
                  h-screen w-2 bg-zinc-200 dark:bg-zinc-800 absolute right-0 top-0 z-[99999]"
                />
              )}
              <Editor
                preview
                onSaveTrigger={triggerSave}
                fileId={params.fileId}
              />
            </aside>
          </Suspense>
        )}

        {(viewState.showBoth || viewState.showCanvas) && (
          <Suspense fallback={<Spinner />}>
            <div
              className="h-screen border-l"
              style={{ width: viewState.showBoth ? "calc(100% - 404px)" : "100%" }}
              ref={canvasRef}
            >
              {fileData && (
                <Canvas
                  preview
                  onSaveTrigger={triggerSave}
                  fileId={params.fileId}
                  fileData={fileData}
                />
              )}
            </div>
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default PreviewPage;
