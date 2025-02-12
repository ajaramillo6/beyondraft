import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  files: defineTable({
    fileName: v.string(),
    projectId: v.string(),
    createdBy: v.string(),
    dateModified: v.number(),
    document: v.string(),
    whiteboard: v.string(),
    isArchive: v.boolean(),
    isPublished: v.optional(v.boolean()),
  })
    .index("by_project", ["projectId"])
    .searchIndex("search_title", {
      searchField: "fileName",
      filterFields: ["projectId"],
    }),

  projects: defineTable({
    projectName: v.string(),
    createdBy: v.string(),
  })
  .index("by_user", ["createdBy"])
  .searchIndex("search_title", {
    searchField: "projectName",
    filterFields: ["createdBy"],
  }),

  user: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.string(),
  }),
});
