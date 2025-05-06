"use client";

import type { Table } from "@tanstack/react-table";
import { ArrowRight, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Member } from "@/data/members";
import { useState } from "react";

interface DataTablePaginationProps {
  members: Member[];
}

export function DataTablePagination({ members }: DataTablePaginationProps) {
  const [page, setPage] = useState<string>("10 Entries");
  return (
    <div className="flex items-stretch justify-between md:justify-end gap-3 flex-wrap">
      <div className="flex items-center space-x-2 flex-1 sm:flex-none">
        <Select
          value={page}
          onValueChange={(value) => {
            setPage(value);
          }}
        >
          <SelectTrigger className=" border-gray-800 bg-primary-foreground text-white text-sm font-semibold px-4 py-2.5 w-full">
            <SelectValue placeholder={page} />
          </SelectTrigger>
          <SelectContent className="border-gray-800 bg-primary-foreground text-white text-sm font-semibold ">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={`${pageSize} Entries`}
                className="hover:bg-white"
              >
                {pageSize} Entries
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-stretch flex-1 sm:flex-none w-full sm:w-auto">
        <Button
          variant="outline"
          className="flex-1 sm:flex-none p-0 border-gray-800 bg-primary-foreground text-white text-base font-semibold hover:bg-white mr-0 rounded-tr-none rounded-br-none px-4 py-2.5 group border-r-0.5"
          // onClick={() => table.previousPage()}
          // disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeft
            className="size-5 text-white group-hover:text-black"
            strokeWidth={2}
          />{" "}
          Previous
        </Button>
        <Button
          variant="outline"
          className="flex-1 sm:flex-none  p-0 border-gray-800 bg-primary-foreground text-white text-base font-semibold hover:bg-white ml-0 rounded-tl-none rounded-bl-none border-l-0 px-4 py-2.5 group"
          // onClick={() => table.nextPage()}
          // disabled={!table.getCanNextPage()}
        >
          Next{" "}
          <ArrowRight
            className="size-5 text-white group-hover:text-black"
            strokeWidth={2}
          />
        </Button>
      </div>
    </div>
  );
}
