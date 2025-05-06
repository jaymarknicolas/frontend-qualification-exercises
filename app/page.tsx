"use client";

import { MembersDataTable } from "@/components/members/table";
import { members } from "@/data/members";

const Home = () => {
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
          <MembersDataTable members={members} />
        </div>
      </div>
    </div>
  );
};

export default Home;
