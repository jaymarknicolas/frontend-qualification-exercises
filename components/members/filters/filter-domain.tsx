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

const data = [
  "https://scaleforge.tech",
  "https://crazywin.ph/19",
  "https://crazywin.opexasystem.com",
  "https://crazywin.ph/219",
  "https://crazywin.ph",
] as const;

interface FilterDomainProps {
  className?: string;
}

const FilterDomain = ({ className }: FilterDomainProps) => {
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
          Domain
          <ChevronDown className="ml-2 h-4 w-4 text-neutral-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[240px] p-0 border-none rounded-[4px] py-4"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search Domain" className="h-9" />
          <CommandList>
            <CommandEmpty>No domain found.</CommandEmpty>
            <CommandGroup className="p-0">
              {data.map((item, index) => (
                <CommandItem
                  value={item}
                  key={index}
                  className=" px-4 text-warning  gap-3 py-2.5"
                >
                  <Checkbox />
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FilterDomain;
