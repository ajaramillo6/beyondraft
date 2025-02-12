"use client";

import React, { useEffect } from "react";
import { toast } from "sonner";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Header from "./_components/Header";
import FileList from "./_components/FileList";
import { useAuth } from "@/app/context_/AuthContext";

interface DashboardProps {
  searchParams: {
    search?: string;
    archive?: string;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ searchParams }) => {
  const { user } = useAuth();
  const convex = useConvex();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      checkAndCreateUser();
    }
  }, [user]);

  const checkAndCreateUser = async () => {
    try {
      const existingUser = await convex.query(api.user.getUser, {
        email: user.email,
      });

      if (!existingUser.length) {
        await createUser({
          name: user.given_name,
          email: user.email,
          image: user.picture,
        });

        toast.success("Account has been created");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Failed to create account");
    }
  };

  return (
    <div className="p-8">
      <Header />
      <FileList query={searchParams} />
    </div>
  );
};

export default Dashboard;
