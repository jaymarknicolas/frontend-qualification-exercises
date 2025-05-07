"use client";

import { useState } from "react";
import { format, addMonths, startOfMonth, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react"; // or use your own icons
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

// utils
import { useMediaQuery } from "@/hooks/use-media-query";
interface DateRangePickerProps {
  className?: string;
  label: string;
}

const DateRangePicker = ({ label, className }: DateRangePickerProps) => {
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
              <div className=" px-6">
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
                />
              </div>
              <div className=" px-6">
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
                />
              </div>
            </div>

            {/* Time & Actions */}
            <div className="border-neutral-800 flex items-center justify-between border-t p-4">
              <div className="flex items-center gap-3 text-white flex-1">
                <div className="flex border border-neutral-800 rounded-[4px] overflow-hidden">
                  <div className="py-3.5 px-2.5 !text-[#BBBCBD] font-normal text-base border-neutral-800 border-r">
                    {format(range.from, "MMM d, yyyy")}
                  </div>
                  <div className="py-3.5 px-2.5 !text-[#BBBCBD] font-normal text-base border-neutral-800 border-l">
                    {format(range.from, "HH:mm:ss")}
                  </div>
                </div>

                <Separator orientation="horizontal" className="!max-w-2" />

                <div className="flex border border-neutral-800 rounded-[4px] overflow-hidden">
                  <div className="py-3.5 px-2.5 !text-[#BBBCBD] font-normal text-base border-neutral-800 border-r">
                    {format(range.to, "MMM d, yyyy")}
                  </div>
                  <div className="py-3.5 px-2.5 !text-[#BBBCBD] font-normal text-base border-neutral-800 border-l">
                    {format(range.to, "HH:mm:ss")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="border-[#7F6832] !text-[#F2BF4E] font-medium text-lg hover:bg-[#7F6832] !hover:text-white px-4 py-2.5"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="border-[#F2BF4E] bg-[#F2BF4E] !text-[#0B1116] font-medium text-lg hover:bg-[#7F6832] !hover:text-white px-4 py-2.5">
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;

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
