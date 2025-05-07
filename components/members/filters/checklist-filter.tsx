"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
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

interface ChecklistFilterProps {
  className?: string;
  filters: string[];
  label: string;
}

const ChecklistFilter = ({
  className,
  filters,
  label,
}: ChecklistFilterProps) => {
  return (
    <Popover>
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
        className="w-[240px] p-0 border-none rounded-[4px] py-4"
        align="start"
      >
        <Command>
          <CommandInput placeholder={`Search ${label}`} className="h-9" />
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
                    <Checkbox />
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
