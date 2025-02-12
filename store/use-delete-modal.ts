import { create } from "zustand";

const defaultValues = { _id: "" };

interface IDeleteModal {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpenDelete: (_id: string) => void;
  onCloseDelete: () => void;
}

export const useDeleteModal = create<IDeleteModal>((set) => ({
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
