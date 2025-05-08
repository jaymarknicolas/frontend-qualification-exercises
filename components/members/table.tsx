"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/members/pagination";
import { VerificationBadge } from "./verification-badge";
import { StatusBadge } from "./status-badge";
import MembersFilter from "./filters";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useMembersContext } from "@/contexts/MembersContext";

const MembersTable = () => {
  const { members, isLoading } = useMembersContext();
  return (
    <div className="overflow-x-auto rounded-lg ">
      <MembersFilter />

      <Table className="w-full border-collapse max-h-[calc(100vh-220px)] border border-neutral-800 ">
        <TableHeader className="bg-primary-foreground sticky top-0">
          <TableRow className="border-neutral-800 hover:bg-transparent">
            <TableHead className="font-medium text-[12px] text-foreground">
              Name
            </TableHead>
            <TableHead className="font-medium text-[12px] text-foreground">
              Verification Status
            </TableHead>
            <TableHead className="font-medium text-[12px] text-foreground">
              Balance
            </TableHead>
            <TableHead className="font-medium text-[12px] text-foreground">
              Email address
            </TableHead>
            <TableHead className="font-medium text-[12px] text-foreground">
              Mobile number
            </TableHead>
            <TableHead className="font-medium text-[12px] text-foreground">
              Domain
            </TableHead>
            <TableHead className="font-medium text-[12px] text-foreground">
              Date Registered
            </TableHead>
            <TableHead className="font-medium text-[12px] text-foreground">
              Status
            </TableHead>
            <TableHead className="font-medium text-[12px] text-foreground">
              Date and Time Last Active
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-secondary">
          {!isLoading ? (
            members && members.length > 0 ? (
              members.map((member) => (
                <TableRow
                  key={member.id}
                  className="border-neutral-800 hover:bg-gray-900/30leading-5 "
                >
                  <TableCell className="font-medium text-[#FBBD2C] text-sm  px-6 py-4 ">
                    {member.name}
                  </TableCell>
                  <TableCell className=" px-6 py-4 ">
                    <VerificationBadge status={member.verificationStatus} />
                  </TableCell>
                  <TableCell className="text-foreground text-sm font-normal  px-6 py-4 ">
                    {member?.wallet?.balance}
                  </TableCell>
                  <TableCell className="text-foreground text-sm font-normal  px-6 py-4 ">
                    {member.emailAddress}
                  </TableCell>
                  <TableCell className="text-foreground text-sm font-normal  px-6 py-4 ">
                    {member.mobileNumber}
                  </TableCell>
                  <TableCell className="text-foreground text-sm font-normal  px-6 py-4 ">
                    {member.domain}
                  </TableCell>
                  <TableCell className="text-foreground text-sm font-normal  px-6 py-4 ">
                    {format(new Date(member.dateTimeCreated), "yyyy MMM dd")}
                  </TableCell>
                  <TableCell className=" px-6 py-4 ">
                    <StatusBadge status={member.status} />
                  </TableCell>
                  <TableCell className="text-foreground text-sm font-normal  px-6 py-4 ">
                    {format(new Date(member.dateTimeLastActive), "yyyy MMM dd")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )
          ) : (
            Array.from({ length: 10 }).map((_, index) => (
              <TableRow
                className="border-neutral-800 hover:bg-gray-900/30leading-5 "
                key={index}
              >
                <TableCell className="font-medium text-[#FBBD2C] text-sm  px-6 py-4 ">
                  <Skeleton className="h-5 w-24 bg-slate-800" />
                </TableCell>
                <TableCell className=" px-6 py-4 ">
                  <Skeleton className="h-6 w-20 rounded-full bg-slate-800" />
                </TableCell>
                <TableCell className="text-foreground text-sm font-normal  px-6 py-4 ">
                  <Skeleton className="h-5 w-16 bg-slate-800" />
                </TableCell>
                <TableCell className="text-foreground text-sm font-normal  px-6 py-4 ">
                  <Skeleton className="h-5 w-40 bg-slate-800" />
                </TableCell>
                <TableCell className="text-foreground text-sm font-normal  px-6 py-4 ">
                  <Skeleton className="h-5 w-32 bg-slate-800" />
                </TableCell>
                <TableCell className="text-foreground text-sm font-normal  px-6 py-4 ">
                  <Skeleton className="h-5 w-40 bg-slate-800" />
                </TableCell>
                <TableCell className="text-foreground text-sm font-normal  px-6 py-4 ">
                  <Skeleton className="h-5 w-40 bg-slate-800" />
                </TableCell>
                <TableCell className=" px-6 py-4 ">
                  <Skeleton className="h-6 w-20 rounded-full bg-slate-800" />
                </TableCell>
                <TableCell className="text-foreground text-sm font-normal  px-6 py-4 ">
                  <Skeleton className="h-5 w-40 bg-slate-800" />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Sticky bottom pagination */}
      <div className="sticky bottom-0 z-20 bg-primary-foreground py-[13px] px-3 border border-neutral-800">
        <Pagination />
      </div>
    </div>
  );
};

export default MembersTable;
