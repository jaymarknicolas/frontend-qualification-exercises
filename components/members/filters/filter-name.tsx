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
import { useState } from "react";

const data = [
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
] as const;

interface FilterNameProps {
  className?: string;
}

const FilterName = ({ className }: FilterNameProps) => {
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
          Name
          <ChevronDown className="ml-2 h-4 w-4 text-neutral-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full lg:w-[240px] p-0 border-none rounded-[4px] py-4"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search Username" className="h-9" />
          <CommandList>
            <CommandEmpty>No username found.</CommandEmpty>
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

export default FilterName;
