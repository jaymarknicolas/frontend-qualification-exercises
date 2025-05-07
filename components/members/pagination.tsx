"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

interface PaginationProps {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  data: any;
  cursorStack: any;
  setCursorStack: any;
  currentAfter: any;
  setCurrentAfter: any;
}

const Pagination = ({
  pageSize,
  setPageSize,
  data,
  cursorStack,
  setCursorStack,
  currentAfter,
  setCurrentAfter,
}: PaginationProps) => {
  // Go to next page
  const handleNextPage = () => {
    if (data.pageInfo.hasNextPage) {
      const nextCursor = data.pageInfo.endCursor;
      setCursorStack((prev: any) => [...prev, currentAfter ?? ""]);
      setCurrentAfter(nextCursor);
    }
  };

  // Go to previous page
  const handlePrevPage = () => {
    const newStack = [...cursorStack];
    const prevCursor = newStack.pop() || null;
    setCursorStack(newStack);
    setCurrentAfter(prevCursor);
  };

  return (
    <div className="flex items-stretch justify-between md:justify-end gap-3 flex-wrap">
      <div className="flex items-center space-x-2 flex-1 sm:flex-none">
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            const newSize = parseInt(value);
            setPageSize(newSize);
            setCurrentAfter(undefined); // Reset pagination when page size changes
          }}
        >
          <SelectTrigger className="border-gray-800 bg-primary-foreground text-white text-sm font-semibold px-4 py-2.5 w-[180px]">
            <SelectValue placeholder={`${pageSize} Entries`} />
          </SelectTrigger>
          <SelectContent className="border-gray-800 bg-primary-foreground text-white text-sm font-semibold">
            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((size) => (
              <SelectItem
                key={size}
                value={size.toString()}
                className="hover:bg-white hover:text-gray-900"
              >
                {size} Entries
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-stretch flex-1 sm:flex-none w-full sm:w-auto">
        <Button
          variant="outline"
          className="flex-1 sm:flex-none p-0 border-gray-800 bg-primary-foreground text-white text-base font-semibold hover:bg-white mr-0 rounded-tr-none rounded-br-none px-4 py-2.5 group border-r-0.5"
          onClick={handlePrevPage}
          disabled={cursorStack.length === 0}
        >
          <ArrowLeft
            className="size-5 text-white group-hover:text-black"
            strokeWidth={2}
          />
          Previous
        </Button>
        <Button
          variant="outline"
          className="flex-1 sm:flex-none  p-0 border-gray-800 bg-primary-foreground text-white text-base font-semibold hover:bg-white ml-0 rounded-tl-none rounded-bl-none border-l-0 px-4 py-2.5 group"
          onClick={handleNextPage}
          disabled={data && !data.pageInfo.hasNextPage}
        >
          Next
          <ArrowRight
            className="size-5 text-white group-hover:text-black"
            strokeWidth={2}
          />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
