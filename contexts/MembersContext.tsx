"use client";

import { createContext, useContext } from "react";
import { Member } from "@/types";

interface MembersContextType {
  members: Member[];
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  currentAfter?: string;
  setCurrentAfter: (cursor?: string) => void;
  cursorStack: string[];
  setCursorStack: (stack: string[]) => void;
  selectedFilters: any;
  setSelectedFilters: (filters: any) => void;
  data: any;
  isLoading: boolean;
  domainSearch: string;
  setDomainSearch: React.Dispatch<React.SetStateAction<string>>;
  emailSearch: string;
  setEmailSearch: React.Dispatch<React.SetStateAction<string>>;
  mobileSearch: string;
  setMobileSearch: React.Dispatch<React.SetStateAction<string>>;
  nameSearch: string;
  setNameSearch: React.Dispatch<React.SetStateAction<string>>;
  filter: any;
  setFilter: (filter: any) => void;
}

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
