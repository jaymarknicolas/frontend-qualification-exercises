"use client";

import { useQuery } from "@tanstack/react-query";
import { getFilteredMembers, getSearchedMembers } from "./actions";
import { FilterParams, SearchParams } from "@/types";

export function useMembers(params: FilterParams) {
  return useQuery({
    queryKey: ["members", params],
    queryFn: () => getFilteredMembers(params),
  });
}

export function useSearchMembers(params: SearchParams) {
  return useQuery({
    queryKey: ["membersSearch", params.field, params.search, params.first],
    queryFn: () => getSearchedMembers(params),
    enabled: !!params.search.trim(), // avoids running when search is empty
  });
}
