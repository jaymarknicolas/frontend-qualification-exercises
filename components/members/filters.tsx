"use client";

import FilterButton from "./filter-button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
// hooks
import { useState } from "react";

// hooks
import { useMediaQuery } from "@/hooks/use-media-query";

// filters
import FilterName from "./filters/filter-name";
import FilterEmail from "./filters/filter-email";
import FilterMobileNumber from "./filters/filter-mobile-number";
import FilterDomain from "./filters/filter-domain";
import FilterVerificationStatus from "./filters/filter-verification-status";
import FilterStatus from "./filters/filter-status";
import DateRangePicker from "./filters/components/date-range-picker";

const MembersFilter = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="border border-neutral-800 bg-primary-foreground p-4 border-b-0">
      {isDesktop ? (
        <div className="flex flex-nowrap items-start gap-2">
          <div className="mr-2 font-medium flex items-center gap-2 text-base text-white h-fit">
            <span>Filters</span>
            <Separator
              orientation="vertical"
              className="!h-[30px] !w-0.5 bg-white"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <FilterName />
            <FilterVerificationStatus />
            <FilterEmail />
            <FilterMobileNumber />
            <FilterDomain />
            <DateRangePicker label="Date Registered" />
            <FilterStatus />
            <DateRangePicker label="Date and Time Last Active" />
          </div>
        </div>
      ) : (
        // Mobile/Tablet view - show filter icon with dropdown
        <Sheet open={open} onOpenChange={setOpen}>
          <div className="flex items-center justify-between">
            <div className="font-medium flex items-center gap-2 text-base text-white">
              <span>Filters</span>
            </div>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent border-neutral-700 hover:bg-neutral-800 hover:text-white"
              >
                <Filter className="h-4 w-4 text-white" />
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent
            side="right"
            className="bg-primary-foreground border-neutral-800 text-white  p-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Filters</h3>
            </div>
            <div className="grid gap-3">
              <FilterName className="justify-between" />
              <FilterVerificationStatus className="justify-between" />
              <FilterEmail className="justify-between" />
              <FilterMobileNumber className="justify-between" />
              <FilterDomain className="justify-between" />
              <DateRangePicker
                label="Date Registered"
                className="justify-between"
              />
              <FilterStatus className="justify-between" />
              <DateRangePicker
                label="Date and Time Last Active"
                className="justify-between"
              />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default MembersFilter;
