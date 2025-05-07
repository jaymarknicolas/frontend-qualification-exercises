"use client";

import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

// hooks
import { useState } from "react";

// custom hooks
import { useMediaQuery } from "@/hooks/use-media-query";

// filters
import DateRangePicker from "./filters/date-range-filter";
import StatusFilter from "./filters/status-filter";
import ChecklistFilter from "./filters/checklist-filter";

const MembersFilter = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const filters = {
    name: {
      label: "Name",
      filters: [
        "morbius",
        "Botmind88",
        "KhemBot",
        "ChrisCross832",
        "JessKing8923",
        "morbius",
        "Botmind88",
        "KhemBot",
        "ChrisCross832",
        "JessKing8923",
      ],
    },
    domain: {
      label: "Domain",
      filters: [
        "https://scaleforge.tech",
        "https://crazywin.ph/19",
        "https://crazywin.opexasystem.com",
        "https://crazywin.ph/219",
        "https://crazywin.ph",
      ],
    },
    email: {
      label: "Email Address",
      filters: [
        "morbius",
        "Botmind88",
        "KhemBot",
        "ChrisCross832",
        "JessKing8923",
        "morbius",
        "Botmind88",
        "KhemBot",
        "ChrisCross832",
        "JessKing8923",
      ],
    },
    mobile_number: {
      label: "Mobile Number",
      filters: [
        "+639928101936",
        "+639785670909",
        "+639560480599",
        "+639773973043",
        "+639773973043",
        "+639928101936",
      ],
    },
    verification_status: {
      label: "Verification Status",
      filters: ["Pending", "Verified", "Unverified"],
    },
    status: {
      label: "Status",
      filters: ["Active", "Blacklisted", "Blacklisted"],
    },
  };

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
            <ChecklistFilter
              label={filters.name.label}
              filters={filters.name.filters}
            />
            <StatusFilter
              label={filters.verification_status.label}
              filters={filters.verification_status.filters}
            />
            <ChecklistFilter
              label={filters.email.label}
              filters={filters.email.filters}
            />
            <ChecklistFilter
              label={filters.mobile_number.label}
              filters={filters.mobile_number.filters}
            />
            <ChecklistFilter
              label={filters.domain.label}
              filters={filters.domain.filters}
            />
            <DateRangePicker label="Date Registered" />
            <StatusFilter
              label={filters.status.label}
              filters={filters.status.filters}
            />
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
              <ChecklistFilter
                label={filters.name.label}
                filters={filters.name.filters}
                className="justify-between"
              />
              <StatusFilter
                label={filters.verification_status.label}
                filters={filters.verification_status.filters}
                className="justify-between"
              />
              <ChecklistFilter
                label={filters.email.label}
                filters={filters.email.filters}
                className="justify-between"
              />
              <ChecklistFilter
                label={filters.mobile_number.label}
                filters={filters.mobile_number.filters}
                className="justify-between"
              />
              <ChecklistFilter
                label={filters.domain.label}
                filters={filters.domain.filters}
                className="justify-between"
              />
              <DateRangePicker
                label="Date Registered"
                className="justify-between"
              />
              <StatusFilter
                label={filters.status.label}
                filters={filters.status.filters}
                className="justify-between"
              />
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
