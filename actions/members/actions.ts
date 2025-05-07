"use server";

import { GET_MEMBERS } from "@/graphql/membersQuery";
import { initializeApollo } from "@/lib/apollo";

export type FilterParams = {
  first: number;
  after?: string;
  filter?: {
    name?: string[];
    emailAddress?: string[];
    domain?: string[];
    status?: string[];
    verificationStatus?: string[];
    dateRegistered?: {
      from: string;
      to: string;
    };
  };
};

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
