"use client";

import { createContext, useContext } from "react";
import { MembersContextType } from "@/types";

export const MembersContext = createContext<MembersContextType | undefined>(
  undefined
);

export const useMembersContext = () => {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error("useMembersContext must be used within a MembersProvider");
  }
  return context;
};
