"use client";

import { enUS } from "date-fns/locale";
import { useState } from "react";
import {
  addDays,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subDays,
  subWeeks,
  subMonths,
  subYears,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react"; // or use your own icons
import { DayPicker } from "react-day-picker";
import { Day } from "date-fns";
import "react-day-picker/dist/style.css";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

const localeWithMonday = {
  ...enUS,
  options: { ...enUS.options, weekStartsOn: 1 as Day }, // Change this line
};

const getDateRange = (label: string) => {
  const today = new Date();
  switch (label) {
    case "Today":
      return { from: today, to: today };
    case "Yesterday":
      const yesterday = subDays(today, 1);
      return { from: yesterday, to: yesterday };
    case "This week":
      return { from: startOfWeek(today), to: endOfWeek(today) };
    case "Last week":
      return {
        from: startOfWeek(subWeeks(today, 1)),
        to: endOfWeek(subWeeks(today, 1)),
      };
    case "This month":
      return { from: startOfMonth(today), to: endOfMonth(today) };
    case "Last month":
      const lastMonth = subMonths(today, 1);
      return { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
    case "This year":
      return { from: startOfYear(today), to: endOfYear(today) };
    case "Last year":
      const lastYear = subYears(today, 1);
      return { from: startOfYear(lastYear), to: endOfYear(lastYear) };
    case "All time":
      return { from: new Date(1582, 9, 4), to: today };
    default:
      return { from: today, to: today };
  }
};

function CustomCaption({
  displayMonth,
  setMonth,
  is_last_month,
}: {
  displayMonth: Date;
  setMonth: (d: Date) => void;
  is_last_month: boolean;
}) {
  return (
    <div className="flex justify-between items-center px-4 py-2 text-white">
      <button onClick={() => setMonth(subMonths(displayMonth, 1))}>
        <ChevronLeft
          className={`size-5 ${
            is_last_month ? "text-[#667085]" : "text-neutral-100"
          }`}
        />
      </button>
      <span className="text-sm font-medium">
        {displayMonth.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </span>
      <button onClick={() => setMonth(addMonths(displayMonth, 1))}>
        <ChevronRight
          className={`size-5 ${
            is_last_month ? "text-[#667085]" : "text-neutral-100"
          }`}
        />
      </button>
    </div>
  );
}

interface DateRangePickerProps {
  className?: string;
  label: string;
}

export function DateRangePicker({ label, className }: DateRangePickerProps) {
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

  const [range, setRange] = useState<{ from: Date; to: Date }>(
    getDateRange("This week")
  );
  const [selectedOption, setSelectedOption] = useState("This week");
  const [month1, setMonth1] = useState(() => new Date());
  const [month2, setMonth2] = useState(() => addMonths(new Date(), 1));

  const handleOptionClick = (label: string) => {
    const range = getDateRange(label);
    setRange(range);
    setSelectedOption(label);
    if (range?.from) {
      setMonth1(startOfMonth(range.from));
      setMonth2(startOfMonth(addMonths(range.from, 1)));
    }
  };

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
        className="w-full  p-0 border-none rounded-[4px] bg-primary"
        align="end"
      >
        <div className="flex bg-primary text-white rounded-lg shadow-lg">
          {/* Sidebar */}
          <div className="flex flex-col w-48 p-4 border-r border-neutral-800 gap-y-1">
            {options.map((label) => (
              <Button
                key={label}
                onClick={() => handleOptionClick(label)}
                className={cn(
                  "text-left justify-start rounded-md transition text-neutral-700 px-4 py-2.5 font-normal text-sm hover:bg-[#FBBD2D]",
                  selectedOption === label
                    ? "bg-[#FBBD2D] "
                    : "hover:bg-[#FBBD2D]"
                )}
              >
                {label}
              </Button>
            ))}
          </div>

          <div className="flex flex-col">
            {/* Calendars */}
            <div className="flex gap-4">
              <div className="py-5 px-6">
                <DayPicker
                  mode="range"
                  selected={range}
                  // @ts-ignore
                  onSelect={setRange}
                  month={month1}
                  onMonthChange={setMonth1}
                  components={{
                    Caption: (props) => (
                      <CustomCaption
                        {...props}
                        setMonth={setMonth1}
                        is_last_month={false}
                      />
                    ),
                  }}
                  showOutsideDays
                  locale={localeWithMonday}
                />
              </div>
              <div className="py-5 px-6">
                <DayPicker
                  mode="range"
                  selected={range}
                  // @ts-ignore
                  onSelect={setRange}
                  month={month2}
                  onMonthChange={setMonth2}
                  components={{
                    Caption: (props) => (
                      <CustomCaption
                        {...props}
                        setMonth={setMonth2}
                        is_last_month={true}
                      />
                    ),
                  }}
                  showOutsideDays
                  locale={localeWithMonday}
                />
              </div>
            </div>

            {/* Time & Actions */}
            <div className="flex flex-col justify-between p-4 border-t border-neutral-800 w-full flex-nowrap">
              <div className="flex justify-between items-center gap-4">
                <input
                  type="datetime-local"
                  value={range.from?.toISOString().slice(0, 16) ?? ""}
                  className="bg-zinc-800 p-2 rounded text-white"
                />
                <span>–</span>
                <input
                  type="datetime-local"
                  value={range.to?.toISOString().slice(0, 16) ?? ""}
                  className="bg-zinc-800 p-2 rounded text-white"
                />
              </div>

              <div className="flex justify-end mt-4 gap-2">
                <Button
                  variant="outline"
                  className="border-yellow-500 text-yellow-500"
                >
                  Cancel
                </Button>
                <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
