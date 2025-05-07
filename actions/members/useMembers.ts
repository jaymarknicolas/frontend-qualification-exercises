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
  if (!params.search) return null;

  return useQuery({
    queryKey: ["domain", params],
    queryFn: () => getFilteredMembersByDomain(params),
  });
}

export function useSearchMembersByName(params: SearchParams) {
  console.log(params.search);
  if (!params.search) return null;

  return useQuery({
    queryKey: ["name", params],
    queryFn: () => getFilteredMembersByName(params),
  });
}

export function useSearchMembersByEmailAddress(params: SearchParams) {
  if (!params.search) return null;

  return useQuery({
    queryKey: ["email_address", params],
    queryFn: () => getFilteredMembersByEmailAddress(params),
  });
}

export function useSearchMembersByMobileNumber(params: SearchParams) {
  if (!params.search) return null;

  return useQuery({
    queryKey: ["mobile_number", params],
    queryFn: () => getFilteredMembersByMobileNumber(params),
  });
}
