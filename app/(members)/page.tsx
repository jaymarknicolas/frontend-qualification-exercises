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
    verificationStatus?: string;
    emailAddress?: string[];
    mobileNumber?: string[];
    domain?: string[];
    status?: string;
    dateTimeCreated?: { from: Date; to: Date };
    dateTimeLastActive?: { from: Date; to: Date };
  }>({});

  const filter = useMemo(() => {
    const output: Record<string, any> = {};

    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (
        (key === "dateTimeCreated" || key === "dateTimeLastActive") &&
        value &&
        typeof value === "object" &&
        "from" in value &&
        "to" in value
      ) {
        output[key] = {
          greaterThanOrEqual: value.from.toISOString(),
          lesserThanOrEqual: value.to.toISOString(),
        };
      } else if (Array.isArray(value) && value.length > 0) {
        output[key] = { in: value };
      } else if (typeof value === "string" && value.trim() !== "") {
        output[key] = { equal: value };
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
    console.log(members.length);
  }, [data, isLoading, isFetching]);

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
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
