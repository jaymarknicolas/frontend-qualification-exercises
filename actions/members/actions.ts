"use server";

import { GET_MEMBERS } from "@/graphql/membersQuery";
import { initializeApollo } from "@/lib/apollo";
import { FilterParams, SearchParams } from "@/types";
import {
  GET_MEMBERS_BY_NAME,
  GET_MEMBERS_BY_EMAIL_ADDRESS,
  GET_MEMBERS_BY_DOMAIN,
  GET_MEMBERS_BY_MOBILE_NUMBER,
} from "@/graphql/membersSearchQueries";

export async function getFilteredMembers({
  first,
  after,
  filter,
}: FilterParams) {
  const apolloClient = initializeApollo();

  const response = await apolloClient.query({
    query: GET_MEMBERS,
    variables: { first, after, filter },
    fetchPolicy: "no-cache",
  });

  return response.data.members;
}

export async function getSearchedMembers({
  field,
  search,
  first,
}: SearchParams) {
  const apolloClient = initializeApollo();

  const QUERY_MAP = {
    name: GET_MEMBERS_BY_NAME,
    emailAddress: GET_MEMBERS_BY_EMAIL_ADDRESS,
    mobileNumber: GET_MEMBERS_BY_MOBILE_NUMBER,
    domain: GET_MEMBERS_BY_DOMAIN,
  };

  const query = QUERY_MAP[field];

  const response = await apolloClient.query({
    query,
    variables: { search, first },
    fetchPolicy: "no-cache",
  });

  const dataKey = {
    name: "membersByName",
    emailAddress: "membersByEmailAddress",
    mobileNumber: "membersByMobileNumber",
    domain: "membersByDomain",
  }[field];

  return response.data[dataKey];
}
