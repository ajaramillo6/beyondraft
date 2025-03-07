"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useMutation } from "convex/react";
import { MainMenu } from "@excalidraw/excalidraw";
import { api } from "@/convex/_generated/api";
import { Id } from '@/convex/_generated/dataModel';
import Spinner from "@/app/_components/Spinner";
import { useWorkspace } from "../../../context_/WorkspaceContext";
import { getInitialElements } from "@/utils/initialElements";
import { useAppContext } from "@/app/context_";

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false }
);

interface CanvasProps {
  preview?: boolean;
  fileId: Id<"files">;
}

const Canvas: React.FC<CanvasProps> = ({ 
  preview,
  fileId,
}) => {
  const { theme } = useTheme();
  const { onSaveTrigger } = useWorkspace();
  const { fileData } = useAppContext();

  const [whiteboardData, setWhiteboardData] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  const updateWhiteboard = useMutation(api.files.updateWhiteboard);

  const saveWhiteboard = async () => {
    try {
      await updateWhiteboard({
        _id: fileId,
        whiteboard: JSON.stringify(whiteboardData),
        dateModified: Date.now(),
      });
    } catch (error) {
      console.error("Error saving whiteboard:", error);
    }
  };

  useEffect(() => {
    if (onSaveTrigger) saveWhiteboard();
  }, [onSaveTrigger]);

  useEffect(() => {
    if (fileData?.whiteboard) {
      setWhiteboardData(JSON.parse(fileData.whiteboard));
    } else {
      setWhiteboardData(getInitialElements(theme || "light"));
    }
    setIsReady(true);
  }, [fileData, theme, fileId]); 

  if (!fileData || fileData._id !== fileId) {
    return <Spinner />;
  }  

  return (
    <div 
      className="invert hue-rotate-180" 
      style={{ 
        height: "calc(100vh - 64px)", 
      }}
    >
      {fileData && (
        <Excalidraw
          key={fileId}
          onChange={(elements) => setWhiteboardData(elements)}
          viewModeEnabled={preview ? true : false}
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
              changeViewBackgroundColor: false,
              clearCanvas: false,
            },
          }}
          initialData={{
            elements: whiteboardData,
            appState: {
              viewBackgroundColor: theme === "light" ? "#000" : "#f5f5f5",
            },
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.Export />
            <MainMenu.DefaultItems.ToggleTheme />
          </MainMenu>
        </Excalidraw>
      )}
    </div>
  );
};

export default Canvas;
