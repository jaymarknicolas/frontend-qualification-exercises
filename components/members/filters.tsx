"use client";

import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

// hooks
import { useState, useMemo } from "react";

// custom hooks
import { useMediaQuery } from "@/hooks/use-media-query";

// filters
import DateRangePicker from "./filter-components/date-range-filter";
import StatusFilter from "./filter-components/status-filter";
import ChecklistFilter from "./filter-components/checklist-filter";

interface MembersFilterProps {
  data: any;
  setSelectedFilters: any;
  selectedFilters: any;
}

const MembersFilter = ({
  data,
  setSelectedFilters,
  selectedFilters,
}: MembersFilterProps) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const unique = (array: string[]): string[] => Array.from(new Set(array));

  const filterOptions = useMemo(() => {
    if (!data?.edges) return null;

    const nodes = data.edges.map((edge: any) => edge.node);

    return {
      name: {
        label: "Name",
        filters: unique(nodes.map((m: any) => m.name).filter(Boolean)),
      },
      domain: {
        label: "Domain",
        filters: unique(nodes.map((m: any) => m.domain).filter(Boolean)),
      },
      emailAddress: {
        label: "Email Address",
        filters: unique(nodes.map((m: any) => m.emailAddress).filter(Boolean)),
      },
      mobileNumber: {
        label: "Mobile Number",
        filters: unique(nodes.map((m: any) => m.mobileNumber).filter(Boolean)),
      },
      verificationStatus: {
        label: "Verification Status",
        filters: unique(
          nodes.map((m: any) => m.verificationStatus).filter(Boolean)
        ),
      },
      status: {
        label: "Status",
        filters: unique(nodes.map((m: any) => m.status).filter(Boolean)),
      },
    };
  }, [data]);

  if (!filterOptions) return <MembersFilterSkeleton />;

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
              selectedFilters={selectedFilters}
              label={filterOptions.name.label}
              filters={filterOptions.name.filters}
              handleFilterChange={(key: any, values: any) => {
                setSelectedFilters((prev: any) => ({
                  ...prev,
                  [key]: values.length > 0 ? values : undefined,
                }));
              }}
              filterKey="name"
            />
            <StatusFilter
              label={filterOptions.verificationStatus.label}
              filters={filterOptions.verificationStatus.filters}
            />
            <ChecklistFilter
              selectedFilters={selectedFilters}
              label={filterOptions.emailAddress.label}
              filters={filterOptions.emailAddress.filters}
              handleFilterChange={(key: any, values: any) => {
                setSelectedFilters((prev: any) => ({
                  ...prev,
                  [key]: values.length > 0 ? values : undefined,
                }));
              }}
              filterKey="emailAddress"
            />
            <ChecklistFilter
              selectedFilters={selectedFilters}
              label={filterOptions.mobileNumber.label}
              filters={filterOptions.mobileNumber.filters}
              handleFilterChange={(key: any, values: any) => {
                setSelectedFilters((prev: any) => ({
                  ...prev,
                  [key]: values.length > 0 ? values : undefined,
                }));
              }}
              filterKey="mobileNumber"
            />
            <ChecklistFilter
              selectedFilters={selectedFilters}
              handleFilterChange={(key: any, values: any) => {
                setSelectedFilters((prev: any) => ({
                  ...prev,
                  [key]: values.length > 0 ? values : undefined,
                }));
              }}
              label={filterOptions.domain.label}
              filters={filterOptions.domain.filters}
              filterKey="domain"
            />
            <DateRangePicker label="Date Registered" />
            <StatusFilter
              label={filterOptions.status.label}
              filters={filterOptions.status.filters}
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
                selectedFilters={selectedFilters}
                handleFilterChange={(key: any, values: any) => {
                  setSelectedFilters((prev: any) => ({
                    ...prev,
                    [key]: values.length > 0 ? values : undefined,
                  }));
                }}
                label={filterOptions.name.label}
                filters={filterOptions.name.filters}
                className="justify-between"
                filterKey="name"
              />
              <StatusFilter
                label={filterOptions.verificationStatus.label}
                filters={filterOptions.verificationStatus.filters}
                className="justify-between"
              />
              <ChecklistFilter
                selectedFilters={selectedFilters}
                handleFilterChange={(key: any, values: any) => {
                  setSelectedFilters((prev: any) => ({
                    ...prev,
                    [key]: values.length > 0 ? values : undefined,
                  }));
                }}
                label={filterOptions.emailAddress.label}
                filters={filterOptions.emailAddress.filters}
                className="justify-between"
                filterKey="emailAddress"
              />
              <ChecklistFilter
                selectedFilters={selectedFilters}
                handleFilterChange={(key: any, values: any) => {
                  setSelectedFilters((prev: any) => ({
                    ...prev,
                    [key]: values.length > 0 ? values : undefined,
                  }));
                }}
                label={filterOptions.mobileNumber.label}
                filters={filterOptions.mobileNumber.filters}
                className="justify-between"
                filterKey="mobileNumber"
              />
              <ChecklistFilter
                selectedFilters={selectedFilters}
                handleFilterChange={(key: any, values: any) => {
                  setSelectedFilters((prev: any) => ({
                    ...prev,
                    [key]: values.length > 0 ? values : undefined,
                  }));
                }}
                label={filterOptions.domain.label}
                filters={filterOptions.domain.filters}
                className="justify-between"
                filterKey="domain"
              />
              <DateRangePicker
                label="Date Registered"
                className="justify-between"
              />
              <StatusFilter
                label={filterOptions.status.label}
                filters={filterOptions.status.filters}
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

export const MembersFilterSkeleton = () => {
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
            {/* Skeleton filters - desktop view */}
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-9 w-[140px] bg-neutral-800/50 rounded-md"
              />
            ))}
          </div>
        </div>
      ) : (
        // Mobile/Tablet view - show filter icon with dropdown
        <div className="flex items-center justify-between">
          <div className="font-medium flex items-center gap-2 text-base text-white">
            <span>Filters</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="bg-transparent border-neutral-700 hover:bg-neutral-800 hover:text-white"
            disabled
          >
            <Filter className="h-4 w-4 text-white opacity-50" />
          </Button>
        </div>
      )}
    </div>
  );
};
