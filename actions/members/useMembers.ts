"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getFilteredMembers,
  getFilteredMembersByDomain,
  getFilteredMembersByName,
  getFilteredMembersByEmailAddress,
  getFilteredMembersByMobileNumber,
} from "./actions";
import { FilterParams, SearchParams } from "@/types";

export function useMembers(params: FilterParams) {
  return useQuery({
    queryKey: ["members", params],
    queryFn: () => getFilteredMembers(params),
  });
}

export function useSearchMembersByDomain(params: SearchParams) {
  return useQuery({
    queryKey: ["domain", params],
    queryFn: () => getFilteredMembersByDomain(params),
  });
}

export function useSearchMembersByName(params: SearchParams) {
  return useQuery({
    queryKey: ["name", params],
    queryFn: () => getFilteredMembersByName(params),
    enabled: params.search.length > 1,
  });
}

export function useSearchMembersByEmailAddress(params: SearchParams) {
  return useQuery({
    queryKey: ["email_address", params],
    queryFn: () => getFilteredMembersByEmailAddress(params),
  });
}

export function useSearchMembersByMobileNumber(params: SearchParams) {
  return useQuery({
    queryKey: ["mobile_number", params],
    queryFn: () => getFilteredMembersByMobileNumber(params),
  });
}
