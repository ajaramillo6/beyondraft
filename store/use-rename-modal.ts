import { create } from "zustand";

const defaultValues = {
  title: "",
  _id: "",
  fileName: "",
  dateModified: Date.now(),
};

interface IRenameModal {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (
    title: string, 
    _id: string, 
    fileName: string, 
    dateModified: number
) => void;
  onClose: () => void;
}

export const useRenameModal = create<IRenameModal>((set) => ({
  isOpen: false,
  initialValues: defaultValues,
  onOpen: (
    title, 
    _id, 
    fileName, 
    dateModified
) =>
    set({
      isOpen: true,
      initialValues: { 
        title, 
        _id, 
        fileName, 
        dateModified 
    },
    }),
  onClose: () =>
    set({
      isOpen: false,
      initialValues: defaultValues,
    }),
}));
