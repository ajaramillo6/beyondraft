import { create } from "zustand";

const defaultValues = { _id: "" };

interface IDeleteProjectModal {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpenDelete: (_id: string) => void;
  onCloseDelete: () => void;
}

export const useDeleteProjectModal = create<IDeleteProjectModal>((set) => ({
  isOpen: false,
  initialValues: defaultValues,
  onOpenDelete: (_id) =>
    set({
      isOpen: true,
      initialValues: { _id },
    }),
  onCloseDelete: () =>
    set({
      isOpen: false,
      initialValues: defaultValues,
    }),
}));
