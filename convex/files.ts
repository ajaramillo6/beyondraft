import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutation to create a new file
export const createFile = mutation({
  args: {
    fileName: v.string(),
    projectId: v.string(),
    createdBy: v.string(),
    isArchive: v.boolean(),
    isPublished: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
    dateModified: v.number(),
  },
  handler: async (ctx, args) => {
    if (!args.createdBy) {
      throw new Error("User must be authenticated to create a file.");
    }
    return await ctx.db.insert("files", args);
  },
});

// Query to get a file by its ID
export const getFileById = query({
  args: {
    _id: v.id("files"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args._id);
  },
});

// Query to get files for a project with optional search
export const getFiles = query({
  args: {
    projectId: v.string(),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { projectId, search } = args;

    // Determine query logic based on whether a search term is provided
    const files = search
      ? await ctx.db
          .query("files")
          .withSearchIndex("search_title", (q) =>
            q.search("fileName", search).eq("projectId", projectId)
          )
          .filter((q) => q.eq(q.field("isArchive"), false))
          .collect()
      : await ctx.db
          .query("files")
          .withIndex("by_project", (q) => q.eq("projectId", projectId))
          .filter((q) => q.eq(q.field("isArchive"), false))
          .order("desc")
          .collect();

    return files;
  },
});

// Query to get archived files
export const getArchive = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("isArchive"), true))
      .order("desc")
      .collect();
  },
});

// Mutation to update a file's name
export const updateFileName = mutation({
  args: {
    _id: v.id("files"),
    createdBy: v.string(),
    fileName: v.string(),
    isPublished: v.optional(v.boolean()),
    dateModified: v.number(),
  },
  handler: async (ctx, args) => {
    // Validate the user authentication
    if (!args.createdBy) {
      throw new Error("User must be authenticated to update a file.");
    }

    // Validate and sanitize the file name
    const trimmedName = args.fileName.trim();
    if (!trimmedName) {
      throw new Error("File name is required.");
    }

    if (trimmedName.length > 60) {
      throw new Error("File name cannot be longer than 60 characters.");
    }

    // Prepare the update payload
    const updatePayload: { fileName: string; dateModified: number; isPublished?: boolean } = {
      fileName: trimmedName,
      dateModified: args.dateModified,
    };

    // Include optional fields if provided
    if (args.isPublished !== undefined) {
      updatePayload.isPublished = args.isPublished;
    }

    // Execute the database update
    return await ctx.db.patch(args._id, updatePayload);
  },
});


// Mutation to update a file's whiteboard content
export const updateWhiteboard = mutation({
  args: {
    _id: v.id("files"),
    whiteboard: v.string(),
    dateModified: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args._id, {
      whiteboard: args.whiteboard,
      dateModified: args.dateModified,
    });
  },
});

// Mutation to update a file's document content
export const updateDocument = mutation({
  args: {
    _id: v.id("files"),
    document: v.string(),
    dateModified: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args._id, {
      document: args.document,
      dateModified: args.dateModified,
    });
  },
});

// Mutation to archive or unarchive a file
export const archiveFile = mutation({
  args: {
    _id: v.id("files"),
    isArchive: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args._id, {
      isArchive: args.isArchive,
    });
  },
});

// Mutation to delete a file by its ID
export const deleteFileById = mutation({
  args: {
    _id: v.id("files"),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.createdBy) {
      throw new Error("User must be authenticated to delete a file.");
    }
    return await ctx.db.delete(args._id);
  },
});
