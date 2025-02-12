import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Save } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useAppContext } from '@/app/context_';
import { useWorkspace } from "../../../context_/WorkspaceContext";
import { Share } from "./Share";
import SidebarAlt from "../../../_components/SideNavAlt";
import { useRouter } from 'next/navigation';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

interface WorkspaceHeaderProps {
  preview?: boolean;
  isEditing: boolean;
  value: string;
  enableInput: () => void;
  disableInput: () => void;
  onInput: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  preview,
  isEditing,
  value,
  enableInput,
  disableInput,
  onInput,
  onKeyDown,
  inputRef,
}) => {
  const { fileData } = useAppContext();
  const { 
    triggerSave, 
    showEditor, 
    showCanvas, 
    showBoth, 
    handleCanvasOptions 
  } = useWorkspace();

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleConfirm = (shouldSave: boolean) => {
    setOpen(false);
    if (shouldSave) {
      triggerSave();
      router.push("/dashboard");
    } else {
      router.push("/dashboard");
    }
  };  

  return (
    <div className="p-3 border-b flex justify-between items-center">
      {!preview && (
        <div className="md:hidden flex items-center">
          <SidebarAlt />
        </div>
      )}
      {!preview && (
      <div className="hidden md:flex gap-2 items-center">
        <a
          href="/dashboard"
          className="flex gap-4 items-center text-sm"
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          <ChevronLeft className="text-gray-600 dark:text-gray-400" />
          <Image 
            src="/1.svg" 
            alt="logo" 
            height={30} 
            width={30}
            priority
          />
        </a>
        {/* Confirmation Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Changes?</DialogTitle>
              <p>Do you want to save changes before exiting?</p>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="default" 
                onClick={() => handleConfirm(false)}
                className="flex border border-red-700 
                       dark:border-red-800 bg-red-700 dark:bg-red-800 
                       hover:bg-red-800 text-white"
              >
                No
              </Button>
              <Button 
                variant="default" 
                onClick={() => handleConfirm(true)}
                className="flex border border-blue-700 
                       dark:border-blue-700 bg-blue-700 dark:bg-blue-700 
                       hover:bg-blue-600 text-white"
              >
                Yes, Save & Exit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="h-6 w-[1px] bg-gray-500 mx-2" />
        {isEditing && fileData ? (
          <TextareaAutosize
            ref={inputRef}
            onBlur={disableInput}
            onKeyDown={onKeyDown}
            value={value}
            onChange={(e) => onInput(e.target.value)}
            className="outline-none resize-none font-bold bg-transparent"
          />
        ) : (
          <div onClick={enableInput} className="outline-none font-bold">
            {fileData?.fileName}
          </div>
        )}
      </div>
      )}
      {preview && (
         <div>
          <Image 
            src="/1.svg" 
            alt="logo" 
            height={30} 
            width={30}
            priority
          />
         </div>
      )}
      {!preview && (
      <div className="hidden md:flex border border-gray-700 rounded-md cursor-pointer">
        <div
          className={`flex items-center p-3 border-r border-gray-700 h-8 text-[12px] ${
            showEditor ? 'bg-gray-200 dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
          } hover:bg-gray-200 dark:hover:bg-gray-800 text-black dark:text-white rounded-l-md`}
          onClick={() => handleCanvasOptions('editor')}
        >
          Document
        </div>
        <div
          className={`flex items-center p-3 h-8 text-[12px] ${
            showBoth ? 'bg-gray-200 dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
          } hover:bg-gray-200 dark:hover:bg-gray-800 text-black dark:text-white`}
          onClick={() => handleCanvasOptions('both')}
        >
          Both
        </div>
        <div
          className={`flex items-center p-3 border-l border-gray-700 h-8 text-[12px] ${
            showCanvas ? 'bg-gray-200 dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
          } hover:bg-gray-200 dark:hover:bg-gray-800 text-black dark:text-white rounded-r-md`}
          onClick={() => handleCanvasOptions('canvas')}
        >
          Canvas
        </div>
      </div>
      )}
      {!preview && (
        <div className="flex gap-2 items-center">
          <Share />
          <Button
            className="border border-gray-700 h-8 text-[12px] gap-2 bg-gray-50 dark:bg-gray-900 
            hover:bg-green-700 hover:border-green-700 dark:hover:bg-green-700 dark:hover:border-green-700 
            text-black dark:text-white hover:text-white dark:hover:text-white"
            onClick={triggerSave}
          >
            <Save className="h-4 w-4" /> Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkspaceHeader;
