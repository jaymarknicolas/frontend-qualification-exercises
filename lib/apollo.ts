import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

export function initializeApollo() {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: process.env.GRAPHQL_API_URL!,
      fetch,
      headers: {
        Authorization: `Bearer ${process.env.GRAPHQL_API_TOKEN}`,
        Accept: "application/json",
        Connection: "keep-alive",
        DNT: "1",
        Origin: `${process.env.GRAPHQL_ORIGIN}`,
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
      },
    }),
    cache: new InMemoryCache(),
  });
}
