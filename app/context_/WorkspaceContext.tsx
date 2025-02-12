"use client"

import React, { 
  createContext, 
  useContext, 
  useState 
} from "react";

interface WorkspaceContextType {
  onSaveTrigger: boolean;
  triggerSave: () => Promise<void>;
  showEditor: boolean;
  showCanvas: boolean;
  showBoth: boolean;
  handleCanvasOptions: (option: "canvas" | "editor" | "both") => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [onSaveTrigger, setOnSaveTrigger] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showBoth, setShowBoth] = useState(true);

  const triggerSave = async () => {
    setOnSaveTrigger(true);
    await new Promise(resolve => setTimeout(resolve, 100));
    setOnSaveTrigger(false);
  };  

  const handleCanvasOptions = async (option: "canvas" | "editor" | "both") => {
    await triggerSave();
    setShowEditor(option === "editor");
    setShowCanvas(option === "canvas");
    setShowBoth(option === "both");
  };

  return (
    <WorkspaceContext.Provider value={{ 
      onSaveTrigger, 
      triggerSave, 
      showEditor, 
      showCanvas, 
      showBoth, 
      handleCanvasOptions 
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used within a WorkspaceProvider");
  return context;
};
