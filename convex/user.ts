import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new user
export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    const newUser = await ctx.db.insert("user", args);
    return newUser;
  },
});

// Get user by email
export const getUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    return result;
  },
});

// Delete a user by ID
export const deleteUserById = mutation({
  args: {
    _id: v.id("user"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args._id);
  },
});
