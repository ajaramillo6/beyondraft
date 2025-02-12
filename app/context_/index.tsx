"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { FILE, PROJECT } from "../(routes)/dashboard/_components/SideNavTop";

interface IAppContextProps {
  showArchive: boolean;
  setShowArchive: (showArchive: boolean) => void;
  fileData: FILE | null;
  setFileData: (fileData: FILE | null) => void;
  fileList: FILE[];
  setFileList: (fileList: FILE[]) => void;
  projectList: PROJECT[];
  setProjectList: (projectList: PROJECT[]) => void;
  activeProject: PROJECT | null;
  setActiveProject: (activeProject: PROJECT | null) => void;
}

const AppContext = createContext<IAppContextProps | undefined>(undefined);

interface AppWrapperProps {
  children: ReactNode;
}

export const AppWrapper = ({ children }: AppWrapperProps) => {
  const [fileList, setFileList] = useState<FILE[]>([]);
  const [projectList, setProjectList] = useState<PROJECT[]>([]);
  const [fileData, setFileData] = useState<FILE | null>(null);
  const [showArchive, setShowArchive] = useState(false);
  const [activeProject, setActiveProject] = useState<PROJECT | null>(null);

  return (
    <AppContext.Provider
      value={{
        showArchive,
        setShowArchive,
        fileList,
        setFileList,
        projectList,
        setProjectList,
        fileData,
        setFileData,
        activeProject,
        setActiveProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an <AppWrapper>");
  }
  return context;
}
