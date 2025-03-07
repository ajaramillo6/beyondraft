import { convertToExcalidrawElements, FONT_FAMILY } from "@excalidraw/excalidraw";

export const getInitialElements = (theme: string) => 
  convertToExcalidrawElements([
    // Header
    {
      type: "text",
      x: 100,
      y: 110,
      fontSize: 16,
      text: "Data Model (Example)",
      strokeColor: "#848484",
    },
    
    // Frame: users
    {
      type: "frame",
      children: ["1", "2", "3", "4", "5", "6", "7", "8"],
      name: "schema: users",
    },
    
    // Table name: users
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      x: 115,
      y: 200,
      fontSize: 14,
      text: "users",
      strokeColor: "#848484",
      id: "1",
    },

    // Column definitions for users
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      x: 115,
      y: 230,
      fontSize: 14,
      text: "id                    int",
      strokeColor: "#82da1e",
      id: "2",
    },
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      x: 115,
      y: 260,
      fontSize: 14,
      text: "name                  string",
      strokeColor: theme === "light" ? "#f5f5f5" : "#000",
      id: "3",
    },
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      x: 115,
      y: 290,
      fontSize: 14,
      text: "email                 string",
      strokeColor: theme === "light" ? "#f5f5f5" : "#000",
      id: "4",
    },
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      x: 115,
      y: 320,
      fontSize: 14,
      text: "password              string",
      strokeColor: theme === "light" ? "#f5f5f5" : "#000",
      id: "5",
    },
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      x: 115,
      y: 350,
      fontSize: 14,
      text: "imgUrl                string",
      strokeColor: theme === "light" ? "#f5f5f5" : "#000",
      id: "6",
    },
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      x: 115,
      y: 380,
      fontSize: 14,
      text: "createdAt             datetime",
      strokeColor: theme === "light" ? "#f5f5f5" : "#000",
      id: "7",
    },
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      x: 115,
      y: 410,
      fontSize: 14,
      text: "updatedAt             datetime",
      strokeColor: theme === "light" ? "#f5f5f5" : "#000",
      id: "8",
    },

    // Frame: playlists
    {
      type: "frame",
      children: ["9", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
      name: "schema: playlists",
      x: 600,
      y: 200,
    },
    
    // Table name: playlists
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      x: 615,
      y: 200,
      fontSize: 14,
      text: "playlists",
      strokeColor: "#848484",
      id: "9",
    },

    // Column definitions for playlists
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      x: 615,
      y: 230,
      fontSize: 14,
      text: "id                    int",
      strokeColor: theme === "light" ? "#f5f5f5" : "#000",
      id: "10",
    },
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      strokeColor: "#82da1e",
      x: 615,
      y: 260,
      fontSize: 14,
      text: "userId                int",
      id: "11",
    },
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      x: 615,
      y: 290,
      fontSize: 14,
      text: "title                 string",
      strokeColor: theme === "light" ? "#f5f5f5" : "#000",
      id: "12",
    },
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      x: 615,
      y: 320,
      fontSize: 14,
      text: "imgUrl                string",
      strokeColor: theme === "light" ? "#f5f5f5" : "#000",
      id: "13",
    },
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      x: 615,
      y: 350,
      fontSize: 14,
      text: "description           string",
      strokeColor: theme === "light" ? "#f5f5f5" : "#000",
      id: "14",
    },
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      x: 615,
      y: 380,
      fontSize: 14,
      text: "likes                 array",
      strokeColor: theme === "light" ? "#f5f5f5" : "#000",
      id: "15",
    },
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      x: 615,
      y: 410,
      fontSize: 14,
      text: "tags                  array",
      strokeColor: theme === "light" ? "#f5f5f5" : "#000",
      id: "16",
    },
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      x: 615,
      y: 440,
      fontSize: 14,
      text: "createdAt             datetime",
      strokeColor: theme === "light" ? "#f5f5f5" : "#000",
      id: "17",
    },
    {
      type: "text",
      fontFamily: FONT_FAMILY.Cascadia,
      x: 615,
      y: 470,
      fontSize: 14,
      text: "updatedAt             datetime",
      strokeColor: theme === "light" ? "#f5f5f5" : "#000",
      id: "18",
    },

    // Relationship arrow: users.id -> playlists.userId
    {
      type: "arrow",
      x: 375,
      y: 240,
      strokeColor: "#bcbcbc",
      strokeWidth: 1,
      strokeStyle: "dotted",
      startArrowhead: "dot",
      endArrowhead: "triangle",
      width: 230,
      height: 30,
    },
  ]);