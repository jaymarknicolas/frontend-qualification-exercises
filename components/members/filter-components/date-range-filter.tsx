"use client";

import React, { useEffect, useState } from "react";
import { addMonths, startOfMonth } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getDateRange } from "@/lib/utils";
import { useMembersContext } from "@/contexts/MembersContext";
import { DateFilterOptions } from "@/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateRangeFilterProps {
  className?: string;
  label: string;
  filterKey: string;
  selectedDateFilterOption: DateFilterOptions;
  setSelectedDateFilterOption: (option: DateFilterOptions) => void;
}

const DateRangeFilter = ({
  label,
  className,
  filterKey,
  selectedDateFilterOption,
  setSelectedDateFilterOption,
}: DateRangeFilterProps) => {
  const { setSelectedFilters } = useMembersContext();
  const options = [
    "Today",
    "Yesterday",
    "This week",
    "Last week",
    "This month",
    "Last month",
    "This year",
    "Last year",
    "All time",
  ];

  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<{ from: Date; to: Date }>(
    getDateRange(selectedDateFilterOption[filterKey])
  );
  const [month1, setMonth1] = useState(() => new Date());
  const [month2, setMonth2] = useState(() => addMonths(new Date(), 1));

  const handleOptionClick = (label: string) => {
    const range = getDateRange(label);
    setRange(range);
    setSelectedDateFilterOption({
      ...selectedDateFilterOption,
      [filterKey]: label,
    });
    if (range?.from) {
      setMonth1(startOfMonth(range.from));
      setMonth2(startOfMonth(addMonths(range.from, 1)));
    }
  };

  const handleDateFilterChange = () => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: {
        from: range.from.toISOString(),
        to: range.to.toISOString(),
      },
    }));
    setOpen(false);
  };

  useEffect(() => {
    if (range?.from) {
      setMonth1(startOfMonth(range.from));
      setMonth2(startOfMonth(addMonths(range.from, 1)));
    }
  }, [range]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            " border-neutral-800 bg-primary text-muted-foreground rounded-md text-sm hover:bg-primary hover:text-muted-foreground",
            className
          )}
        >
          {label}
          <ChevronDown className="ml-2 h-4 w-4 text-neutral-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full  p-0 border-none rounded-[4px] bg-primary lg:translate-none"
        align="end"
      >
        <div className="bg-primary text-white rounded-lg shadow-lg flex-col lg:flex-row flex">
          {/* Sidebar */}
          <div className="  flex-col w-48 p-4 border-r border-neutral-800 gap-y-1 hidden lg:flex">
            {options.map((label) => (
              <Button
                key={label}
                onClick={() => handleOptionClick(label)}
                className={cn(
                  "text-left justify-start rounded-md transition text-neutral-700 px-4 py-2.5 font-normal text-sm hover:bg-[#FBBD2D]",
                  selectedDateFilterOption[filterKey] === label
                    ? "bg-[#FBBD2D] "
                    : "hover:bg-[#FBBD2D]"
                )}
              >
                {label}
              </Button>
            ))}
          </div>
          <div className="  flex-col w-full lg:w-48 p-4 gap-y-1 flex lg:hidden">
            <Select
              value={selectedDateFilterOption[filterKey]}
              onValueChange={(value) => {
                handleOptionClick(value);
              }}
            >
              <SelectTrigger className="border-gray-800 bg-primary-foreground text-white text-sm font-semibold px-4 py-2.5 w-full">
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent className="border-gray-800 bg-primary-foreground text-white text-sm font-semibold">
                {options.map((label, index) => (
                  <SelectItem
                    key={index}
                    value={label}
                    className={cn(
                      "hover:bg-white hover:text-gray-900",
                      selectedDateFilterOption[filterKey] === label
                        ? "bg-[#FBBD2D] "
                        : "hover:bg-[#FBBD2D]"
                    )}
                  >
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            {/* Calendars */}
            <div className="flex gap-4 calendar-container">
              <div className=" px-6">
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={(range) => {
                    if (range) {
                      if (range) {
                        setRange({
                          from: range.from ?? new Date(),
                          to: range.to ?? new Date(),
                        });
                      }
                    }
                  }}
                  month={month1}
                  onMonthChange={setMonth1}
                  showOutsideDays
                />
              </div>
              <div className="hidden lg:block px-6">
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={(range) => {
                    if (range) {
                      if (range) {
                        setRange({
                          from: range.from ?? new Date(),
                          to: range.to ?? new Date(),
                        });
                      }
                    }
                  }}
                  month={month2}
                  onMonthChange={setMonth2}
                  showOutsideDays
                />
              </div>
            </div>

            {/* Time & Actions */}
            <div className="border-neutral-800 flex items-center justify-between border-t p-4 flex-col lg:flex-row gap-4">
              <div className="flex items-center gap-3 text-white flex-1 flex-col lg:flex-row w-full">
                <div className="flex border border-neutral-800 rounded-[4px] overflow-hidden w-full">
                  <DatePicker
                    open={false}
                    selected={range.from}
                    onChange={(date) =>
                      date &&
                      setRange((prevRange) => ({ ...prevRange, from: date }))
                    }
                    dateFormat="MMM d, yyyy"
                    placeholderText="Enter date (e.g., May 7, 2025)"
                    className="py-3.5 px-2.5 !text-[#BBBCBD] font-normal text-base border-neutral-800 border-r focus-visible:border-none max-w-32 focus-visible:outline-none "
                  />
                  <DatePicker
                    open={false}
                    selected={range.from}
                    onChange={(date) =>
                      date &&
                      setRange((prevRange) => ({ ...prevRange, from: date }))
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={1}
                    timeCaption="Time"
                    dateFormat="HH:mm:ss"
                    placeholderText="Enter time (e.g., 14:30:00)"
                    className="py-3.5 px-2.5 !text-[#BBBCBD] font-normal text-base border-neutral-800 border-l max-w-24 focus-visible:outline-none"
                  />
                </div>

                <Separator
                  orientation="horizontal"
                  className="!max-w-2 bg-[#7B7F83] hidden lg:block"
                />

                <div className="flex border border-neutral-800 rounded-[4px] overflow-hidden  w-full">
                  <DatePicker
                    open={false}
                    selected={range.to}
                    onChange={(date) =>
                      date &&
                      setRange((prevRange) => ({ ...prevRange, to: date }))
                    }
                    dateFormat="MMM d, yyyy"
                    placeholderText="Enter date (e.g., May 7, 2025)"
                    className="py-3.5 px-2.5 !text-[#BBBCBD] font-normal text-base border-neutral-800 border-r focus-visible:border-none max-w-32 focus-visible:outline-none"
                  />
                  <DatePicker
                    open={false}
                    selected={range.to}
                    onChange={(date) =>
                      date &&
                      setRange((prevRange) => ({ ...prevRange, to: date }))
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={1}
                    timeCaption="Time"
                    dateFormat="HH:mm:ss"
                    placeholderText="Enter time (e.g., 14:30:00)"
                    className="py-3.5 px-2.5 !text-[#BBBCBD] font-normal text-base border-neutral-800 border-l max-w-24 focus-visible:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-3 lg:mt-0 w-full lg:w-auto">
                <Button
                  variant="outline"
                  className="flex-1 lg:flex-auto h-full border-[#7F6832] !text-[#F2BF4E] font-medium text-lg hover:bg-[#7F6832] !hover:text-white px-4 py-2.5"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 lg:flex-auto h-full border-[#F2BF4E] bg-[#F2BF4E] !text-[#0B1116] font-medium text-lg hover:bg-[#7F6832] !hover:text-white px-4 py-2.5"
                  onClick={handleDateFilterChange}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-auto"></div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeFilter;
