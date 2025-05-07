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

export async function getFilteredMembersByDomain({
  search,
  first,
}: SearchParams) {
  const apolloClient = initializeApollo();

  const response = await apolloClient.query({
    query: GET_MEMBERS_BY_DOMAIN,
    variables: { first, search },
    fetchPolicy: "no-cache",
  });
  return response.data.membersByDomain;
}

export async function getFilteredMembersByName({
  search,
  first,
}: SearchParams) {
  const apolloClient = initializeApollo();

  const response = await apolloClient.query({
    query: GET_MEMBERS_BY_NAME,
    variables: { first, search },
    fetchPolicy: "no-cache",
  });
  return response.data.membersByName;
}

export async function getFilteredMembersByEmailAddress({
  search,
  first,
}: SearchParams) {
  const apolloClient = initializeApollo();

  const response = await apolloClient.query({
    query: GET_MEMBERS_BY_EMAIL_ADDRESS,
    variables: { first, search },
    fetchPolicy: "no-cache",
  });
  return response.data.membersByEmailAddress;
}

export async function getFilteredMembersByMobileNumber({
  search,
  first,
}: SearchParams) {
  const apolloClient = initializeApollo();

  const response = await apolloClient.query({
    query: GET_MEMBERS_BY_MOBILE_NUMBER,
    variables: { first, search },
    fetchPolicy: "no-cache",
  });
  return response.data.membersByMobileNumber;
}
