"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMembersContext } from "@/contexts/MembersContext";
import { useEffect, useState } from "react";

interface ChecklistFilterProps {
  className?: string;
  filters: string[];
  label: string;
  filterKey: string;
  searchFunction: (value: string) => void;
  searchValue: string;
}

const ChecklistFilter = ({
  className,
  filters,
  label,
  filterKey,
  searchFunction,
  searchValue,
}: ChecklistFilterProps) => {
  const { selectedFilters, setSelectedFilters } = useMembersContext();
  const [open, setOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<string[]>(
    selectedFilters[filterKey] || []
  );

  // Apply filters only when popover closes
  useEffect(() => {
    if (!open) {
      handleFilterChange(filterKey, tempFilters);
    }
  }, [open]);

  const handleFilterChange = (key: any, values: any) => {
    setSelectedFilters((prev: any) => ({
      ...prev,
      [filterKey]: values.length > 0 ? values : undefined,
    }));
  };

  const toggleValue = (value: string) => {
    setTempFilters((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
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
        className="w-auto p-0 border-none rounded-[4px] py-4"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder={`Search ${label}`}
            className="h-9"
            onChangeCapture={(e) => {
              const target = e.target as HTMLInputElement;
              searchFunction(target.value);
            }}
            value={searchValue}
          />
          <CommandList>
            <CommandEmpty>{`No ${label.toLocaleLowerCase()} found.`}</CommandEmpty>
            <CommandGroup className="p-0">
              {filters &&
                filters.map((filter, index) => (
                  <CommandItem
                    value={filter}
                    key={index}
                    className=" px-4 text-warning  gap-3 py-2.5"
                  >
                    <Checkbox
                      checked={tempFilters.includes(filter)}
                      onCheckedChange={() => toggleValue(filter)}
                    />
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

export default ChecklistFilter;
