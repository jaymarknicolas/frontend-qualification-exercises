"use client";

import { useQuery } from "@tanstack/react-query";
import { getFilteredMembers, FilterParams } from "./actions";

export function useMembers(params: FilterParams) {
  return useQuery({
    queryKey: ["members", params],
    queryFn: () => getFilteredMembers(params),
  });
}
