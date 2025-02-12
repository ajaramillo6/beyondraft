import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutation to create a new project
export const createProject = mutation({
  args: {
    projectName: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.createdBy) {
      throw new Error("User must be authenticated to create a project.");
    }
    return await ctx.db.insert("projects", args);
  },
});

// Query to get projects created by a specific user
export const getUserProjects = query({
  args: {
    createdBy: v.string(),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { createdBy, search } = args;

    const projects = search
      ? await ctx.db
          .query("projects")
          .withSearchIndex("search_title", (q) =>
            q.search("projectName", search).eq("createdBy", createdBy)
          )
          .collect()
      : await ctx.db
          .query("projects")
          .withIndex("by_user", (q) => q.eq("createdBy", createdBy))
          .order("desc")
          .collect();

    return projects;
  },
});

// Mutation to update a project's name
export const updateProjectName = mutation({
  args: {
    _id: v.id("projects"),
    projectName: v.string(),
  },
  handler: async (ctx, args) => {
    const trimmedName = args.projectName.trim();

    if (!trimmedName) {
      throw new Error("Project name is required.");
    }
    if (trimmedName.length > 60) {
      throw new Error("Project name cannot be longer than 60 characters.");
    }

    return await ctx.db.patch(args._id, {
      projectName: trimmedName,
    });
  },
});

// Mutation to delete a project by its ID
export const deleteProjectbyId = mutation({
  args: {
    _id: v.id("projects"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args._id);
  },
});
