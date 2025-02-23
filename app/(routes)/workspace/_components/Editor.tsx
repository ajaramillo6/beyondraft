"use client";

import React, { useEffect, useRef } from "react";
import EditorJS, { ToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import InlineCode from "@editorjs/inline-code";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useAppContext } from "@/app/context_";
import { useWorkspace } from "../../../context_/WorkspaceContext";
import { Id } from "@/convex/_generated/dataModel";

// Raw document structure
const rawDocument = (title: string) => ({
  time: Date.now(),
  blocks: [
    {
      id: "header-1",
      type: "header",
      data: {
        text: title,
        level: 2,
      },
    },
    {
      id: "paragraph-1",
      type: "paragraph",
      data: {
        text: "",
      },
    },
  ],
  version: "2.8.1",
});

interface EditorProps {
  preview?: boolean;
  fileId: Id<"files">;
}

const Editor: React.FC<EditorProps> = ({ preview, fileId }) => {
  const { fileData } = useAppContext();
  const { onSaveTrigger } = useWorkspace();
  const ref = useRef<EditorJS | null>(null);

  const updateDocument = useMutation(api.files.updateDocument);

  const clearEditor = () => {
    const holder = document.getElementById("editorjs");
    if (holder) holder.innerHTML = "";
    ref.current = null;
  };

  const initEditor = () => {
    clearEditor();

    try {
      ref.current = new EditorJS({
        readOnly: !!preview,
        holder: "editorjs",
        tools: {
          header: {
            class: Header as unknown as ToolConstructable,
            shortcut: "CMD+SHIFT+H",
            config: { placeholder: "Enter a header" },
          },
          list: { class: List as unknown as ToolConstructable, inlineToolbar: true },
          checklist: { class: Checklist as unknown as ToolConstructable, inlineToolbar: true },
          paragraph: {
            class: Paragraph as unknown as ToolConstructable,
            inlineToolbar: ["bold", "italic", "inlineCode"],
          },
          inlineCode: { class: InlineCode as unknown as ToolConstructable },
        },
        data: fileData?.document
          ? JSON.parse(fileData.document)
          : rawDocument(fileData?.fileName || ""),
      });

      setTimeout(() => {
        document.querySelectorAll(".ce-header").forEach((el) => {
          el.setAttribute("data-placeholder", "Enter a header");
        });
        document.querySelectorAll(".ce-paragraph").forEach((el) => {
          el.setAttribute(
            "data-placeholder",
            "Type your notes here - style with markdown or shortcut (/)"
          );
        });
      }, 100);
    } catch (error) {
      console.error("Error initializing editor:", error);
    }
  };

  useEffect(() => {
    if (fileData) {
      initEditor();
    }
    return () => {
      clearEditor();
    };
  }, [fileId, fileData]);

  const onSaveDocument = async () => {
    if (!ref.current) return;
    try {
      const outputData = await ref.current.save();
      await updateDocument({
        _id: fileId,
        document: JSON.stringify(outputData),
        dateModified: Date.now(),
      });
      toast.success("Document updated successfully");
    } catch (error) {
      console.error("Error saving document:", error);
      toast.error("Failed to update document");
    }
  };

  useEffect(() => {
    if (onSaveTrigger) {
      onSaveDocument();
    }
  }, [onSaveTrigger]);

  return (
    <div
      id="editorjs"
      className="bg-white dark:bg-neutral-950 px-10 w-screen md:w-full overflow-auto"
      style={{ height: "100%" }}
    />
  );
};

export default Editor;
