"use client";

import { useEffect, useState, useMemo } from "react";

import { useMembers } from "@/actions/members/useMembers";
import { Member } from "@/types";
import MembersTable from "@/components/members/table";
import { MembersContext } from "@/contexts/MembersContext";

const Home = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [members, setMembers] = useState<Member[]>([]);
  const [cursorStack, setCursorStack] = useState<string[]>([]);
  const [currentAfter, setCurrentAfter] = useState<string | undefined>(
    undefined
  );

  const [selectedFilters, setSelectedFilters] = useState<{
    name?: any;
    verificationStatus?: string;
    emailAddress?: any;
    mobileNumber?: any;
    domain?: any;
    status?: string;
    dateTimeCreated?: { from: Date; to: Date };
    dateTimeLastActive?: { from: Date; to: Date };
  }>({});

  const filter = useMemo(() => {
    const output: Record<string, any> = {};

    for (const [key, value] of Object.entries(selectedFilters)) {
      if (
        (key === "dateTimeCreated" || key === "dateTimeLastActive") &&
        value?.from &&
        value?.to
      ) {
        output[key] = {
          greaterThanOrEqual: new Date(value.from).toISOString(),
          lesserThanOrEqual: new Date(value.to).toISOString(),
        };
      } else if (Array.isArray(value) && value.length > 0) {
        output[key] = { in: value };
      } else if (typeof value === "string" && value.trim()) {
        output[key] = { equal: value.trim() };
      }
    }

    return Object.keys(output).length ? output : undefined;
  }, [selectedFilters]);

  const { data, isLoading, isFetching } = useMembers({
    first: pageSize,
    after: currentAfter,
    filter: filter,
  });

  useEffect(() => {
    const members = data?.edges?.map((edge: any) => edge.node) || [];
    setMembers(members);
  }, [data, isLoading, isFetching]);

  return (
    <MembersContext.Provider
      value={{
        members,
        pageSize,
        setPageSize,
        currentAfter,
        setCurrentAfter,
        cursorStack,
        setCursorStack,
        selectedFilters,
        setSelectedFilters,
        data,
        isLoading,
      }}
    >
      <div className="flex flex-col">
        <div className="container max-w-[1440px] mx-auto px-6 py-6 flex flex-col  space-y-6">
          <div className="space-y-2">
            <h1 className="text-[32px] font-medium leading-9 text-white">
              Members
            </h1>
            <p className="text-base text-neutral-500">
              View your members here.
            </p>
          </div>

          <div className="flex-1 ">
            <MembersTable />
          </div>
        </div>
      </div>
    </MembersContext.Provider>
  );
};

export default Home;
