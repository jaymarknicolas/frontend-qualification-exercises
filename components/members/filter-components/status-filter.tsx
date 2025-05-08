"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

import { useEffect, useState, useCallback } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useMembersContext } from "@/contexts/MembersContext";

interface StatusFilterProps {
  className?: string;
  filters: string[];
  label: string;
  filterKey: string;
}

const StatusFilter = ({
  label,
  filters,
  className,
  filterKey,
}: StatusFilterProps) => {
  const { selectedFilters, setSelectedFilters } = useMembersContext();
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState<string | undefined>(
    selectedFilters[filterKey] as string | undefined
  );

  const handleFilterChange = useCallback(
    (key: string, value: string | undefined) => {
      setSelectedFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setSelectedFilters]
  );
  useEffect(() => {
    if (!open) {
      handleFilterChange(filterKey, tempValue);
    }
  }, [open, filterKey, tempValue, handleFilterChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          //   onClick={onClick}
          className={cn(
            "border-neutral-800 bg-primary text-muted-foreground rounded-md text-sm hover:bg-primary hover:text-muted-foreground",
            className
          )}
        >
          {label}
          <ChevronDown className="ml-2 h-4 w-4 text-neutral-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border-none rounded-[4px]"
        align="start"
      >
        <Command>
          <CommandList>
            <CommandGroup className="p-0">
              {filters &&
                filters.map((filter, index) => (
                  <CommandItem
                    value={filter}
                    key={index}
                    className=" px-4 text-white  gap-3 py-2.5 "
                    onSelect={() => {
                      setTempValue(filter === tempValue ? undefined : filter);
                      setOpen(false); // close popover on select
                    }}
                  >
                    {filter}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StatusFilter;
