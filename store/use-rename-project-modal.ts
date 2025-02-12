import { create } from "zustand";

const defaultValues = {
  title: "",
  _id: "",
  projectName: "",
};

interface IRenameProjectModal {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (
    title: string, 
    _id: string, 
    projectName: string
) => void;
  onClose: () => void;
}

export const useRenameProjectModal = create<IRenameProjectModal>((set) => ({
  isOpen: false,
  initialValues: defaultValues,
  onOpen: (
    title, 
    _id, 
    projectName
) =>
    set(
        {
            isOpen: true,
            initialValues: { 
                title, 
                _id, 
                projectName 
            },
        }
    ),
  onClose: () =>
    set({
      isOpen: false,
      initialValues: defaultValues,
    }),
}));
