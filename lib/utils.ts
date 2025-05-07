import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {
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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDateRange = (label: string) => {
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
