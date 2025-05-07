"use client";

import { Button } from "../ui/button";
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

import { Checkbox } from "../ui/checkbox";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

interface FilterButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const FilterButton = ({ label, onClick, className }: FilterButtonProps) => {
  const [search, setSearch] = useState("");
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          onClick={onClick}
          className={cn(
            "border-neutral-800 bg-primary text-neutral-600 rounded-md text-sm hover:bg-primary hover:text-neutral-600",
            className,
            !search && "text-muted-foreground"
          )}
        >
          {label}
          <ChevronDown className="ml-2 h-4 w-4 text-neutral-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[240px] p-0 border-none rounded-1 py-4"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="p-0">
              {languages.map((language) => (
                <CommandItem
                  value={language.label}
                  key={language.value}
                  className=" px-4 text-warning  gap-3 py-2.5"
                >
                  <Checkbox />
                  {language.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FilterButton;
