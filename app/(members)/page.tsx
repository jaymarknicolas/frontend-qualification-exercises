"use client";

import { useEffect, useState, useMemo } from "react";

import { useMembers } from "@/actions/members/useMembers";
import { Member } from "@/types";

import MembersTable from "@/components/members/table";

const Home = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [members, setMembers] = useState<Member[]>([]);
  const [cursorStack, setCursorStack] = useState<string[]>([]);
  const [currentAfter, setCurrentAfter] = useState<string | undefined>(
    undefined
  );

  const [selectedFilters, setSelectedFilters] = useState<{
    name?: string[];
    domain?: string[];
    emailAddress?: string[];
    mobileNumber?: string[];
    verificationStatus?: string[];
    status?: string[];
  }>({});

  // Transform checkbox values to GraphQL `in` filters
  const filter = useMemo(() => {
    const output: Record<string, any> = {};
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        output[key] = { in: values }; // Only use `in` operator
      }
    });
    return Object.keys(output).length > 0 ? output : undefined;
  }, [selectedFilters]);

  const { data, isLoading, isFetching } = useMembers({
    first: pageSize,
    after: currentAfter,
    filter: filter,
  });

  useEffect(() => {
    // Extract the members' data from the API response
    const members = data?.edges?.map((edge: any) => edge.node) || [];
    setMembers(members);
  }, [data, isLoading, isFetching]);

  const handleFilterChange = (
    key: keyof typeof selectedFilters,
    value: string,
    checked: boolean
  ) => {
    setSelectedFilters((prev) => {
      const current = prev[key] || [];

      const updated = checked
        ? [...current, value] // Add if checked
        : current.filter((v) => v !== value); // Remove if unchecked
      return {
        ...prev,
        [key]: updated.length > 0 ? updated : undefined, // Remove key if empty
      };
    });
  };

  return (
    <div className="flex flex-col">
      <div className="container max-w-[1440px] mx-auto px-6 py-6 flex flex-col  space-y-6">
        <div className="space-y-2">
          <h1 className="text-[32px] font-medium leading-9 text-white">
            Members
          </h1>
          <p className="text-base text-neutral-500">View your members here.</p>
        </div>

        <div className="flex-1 ">
          <MembersTable
            members={members}
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentAfter={currentAfter}
            cursorStack={cursorStack}
            setCurrentAfter={setCurrentAfter}
            setCursorStack={setCursorStack}
            data={data}
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
