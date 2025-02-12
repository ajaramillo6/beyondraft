"use client";

import { useEffect, useState } from "react";

import { RenameModal } from "@/components/modals/rename-modal";
import { DeleteModal } from "@/components/modals/delete-modal";
import { RenameProjectModal } from "@/components/modals/rename-project-modal";
import { DeleteProjectModal } from "@/components/modals/delete-project-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted){
        return null;
    }

    return (
        <>
            <RenameModal />
            <RenameProjectModal />
            <DeleteModal />
            <DeleteProjectModal />
        </>
    )
}