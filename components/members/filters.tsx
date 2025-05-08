"use client";

import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Member } from "@/types";

import {
  useSearchMembersByDomain,
  useSearchMembersByEmailAddress,
  useSearchMembersByMobileNumber,
  useSearchMembersByName,
} from "@/actions/members/useMembers";

// hooks
import { useState, useMemo } from "react";

// custom hooks
import { useMediaQuery } from "@/hooks/use-media-query";

// filters
import DateRangePicker from "./filter-components/date-range-filter";
import StatusFilter from "./filter-components/status-filter";
import ChecklistFilter from "./filter-components/checklist-filter";
import { useMembersContext } from "@/contexts/MembersContext";

import { DateFilterOptions } from "@/types";

const MembersFilter = () => {
  const { members } = useMembersContext();

  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [selectedDateFilterOption, setSelectedDateFilterOption] =
    useState<DateFilterOptions>({
      dateTimeCreated: "This week",
      dateTimeLastActive: "This week",
    });

  const [emailSearch, setEmailSearch] = useState("");
  const [mobileSearch, setMobileSearch] = useState("");
  const [domainSearch, setDomainSearch] = useState("");

  const domainResult = useSearchMembersByDomain({
    search: domainSearch,
    first: 20,
  });

  const [nameSearch, setNameSearch] = useState("");

  const nameResult = useSearchMembersByName({
    search: nameSearch,
    first: 20,
  });

  const emailAddressResult = useSearchMembersByEmailAddress({
    search: emailSearch,
    first: 20,
  });

  const mobileNumberResult = useSearchMembersByMobileNumber({
    search: mobileSearch,
    first: 20,
  });

  const unique = (array: string[]): string[] => Array.from(new Set(array));

  const filterOptions = useMemo(() => {
    const filters = members ?? [];
    const getFilters = (key: string) =>
      unique(filters.map((m: Member) => m[key]).filter(Boolean));
    return {
      name: {
        label: "Name",
        filters:
          nameResult && nameResult.data
            ? unique(
                nameResult.data.map((m: Member) => m["name"]).filter(Boolean)
              )
            : getFilters("name"),
      },
      domain: {
        label: "Domain",
        filters:
          domainResult && domainResult.data
            ? unique(
                domainResult.data
                  .map((m: Member) => m["domain"])
                  .filter(Boolean)
              )
            : getFilters("domain"),
      },
      emailAddress: {
        label: "Email Address",
        filters:
          emailAddressResult && emailAddressResult.data
            ? unique(
                emailAddressResult.data
                  .map((m: Member) => m["emailAddress"])
                  .filter(Boolean)
              )
            : getFilters("emailAddress"),
      },
      mobileNumber: {
        label: "Mobile Number",
        filters:
          mobileNumberResult && mobileNumberResult.data
            ? unique(
                mobileNumberResult.data
                  .map((m: Member) => m["mobileNumber"])
                  .filter(Boolean)
              )
            : getFilters("mobileNumber"),
      },
      verificationStatus: {
        label: "Verification Status",
        filters: getFilters("verificationStatus"),
      },
      status: {
        label: "Status",
        filters: getFilters("status"),
      },
    };
  }, [
    members,
    nameResult,
    domainResult,
    emailAddressResult,
    mobileNumberResult,
  ]);

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
              label={filterOptions.name.label}
              filters={filterOptions.name.filters}
              filterKey="name"
              searchFunction={setNameSearch}
              searchValue={nameSearch}
            />
            <StatusFilter
              filterKey="verificationStatus"
              label={filterOptions.verificationStatus.label}
              filters={filterOptions.verificationStatus.filters}
            />
            <ChecklistFilter
              label={filterOptions.emailAddress.label}
              filters={filterOptions.emailAddress.filters}
              filterKey="emailAddress"
              searchFunction={setEmailSearch}
              searchValue={emailSearch}
            />
            <ChecklistFilter
              label={filterOptions.mobileNumber.label}
              filters={filterOptions.mobileNumber.filters}
              filterKey="mobileNumber"
              searchFunction={setMobileSearch}
              searchValue={mobileSearch}
            />
            <ChecklistFilter
              label={filterOptions.domain.label}
              filters={filterOptions.domain.filters}
              filterKey="domain"
              searchFunction={setDomainSearch}
              searchValue={domainSearch}
            />
            <DateRangePicker
              label="Date Registered"
              filterKey="dateTimeCreated"
              selectedDateFilterOption={selectedDateFilterOption}
              setSelectedDateFilterOption={setSelectedDateFilterOption}
            />
            <StatusFilter
              filterKey="status"
              label={filterOptions.status.label}
              filters={filterOptions.status.filters}
            />
            <DateRangePicker
              label="Date and Time Last Active"
              filterKey="dateTimeLastActive"
              selectedDateFilterOption={selectedDateFilterOption}
              setSelectedDateFilterOption={setSelectedDateFilterOption}
            />
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
                label={filterOptions.name.label}
                filters={filterOptions.name.filters}
                className="justify-between"
                filterKey="name"
                searchFunction={setNameSearch}
                searchValue={nameSearch}
              />
              <StatusFilter
                filterKey="verificationStatus"
                label={filterOptions.verificationStatus.label}
                filters={filterOptions.verificationStatus.filters}
                className="justify-between"
              />
              <ChecklistFilter
                label={filterOptions.emailAddress.label}
                filters={filterOptions.emailAddress.filters}
                className="justify-between"
                filterKey="emailAddress"
                searchFunction={setEmailSearch}
                searchValue={emailSearch}
              />
              <ChecklistFilter
                label={filterOptions.mobileNumber.label}
                filters={filterOptions.mobileNumber.filters}
                className="justify-between"
                filterKey="mobileNumber"
                searchFunction={setMobileSearch}
                searchValue={mobileSearch}
              />
              <ChecklistFilter
                label={filterOptions.domain.label}
                filters={filterOptions.domain.filters}
                className="justify-between"
                filterKey="domain"
                searchFunction={setDomainSearch}
                searchValue={domainSearch}
              />
              <DateRangePicker
                label="Date Registered"
                className="justify-between"
                filterKey="dateTimeCreated"
                selectedDateFilterOption={selectedDateFilterOption}
                setSelectedDateFilterOption={setSelectedDateFilterOption}
              />
              <StatusFilter
                filterKey="status"
                label={filterOptions.status.label}
                filters={filterOptions.status.filters}
                className="justify-between"
              />
              <DateRangePicker
                label="Date and Time Last Active"
                className="justify-between"
                filterKey="dateTimeLastActive"
                selectedDateFilterOption={selectedDateFilterOption}
                setSelectedDateFilterOption={setSelectedDateFilterOption}
              />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default MembersFilter;
