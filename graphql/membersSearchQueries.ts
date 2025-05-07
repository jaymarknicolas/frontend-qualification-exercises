import { gql } from "@apollo/client";

export const GET_MEMBERS_BY_DOMAIN = gql`
  query ($search: String!, $first: Int) {
    membersByDomain(search: $search, first: $first) {
      id
      ... on Member {
        name
        verificationStatus
        emailAddress
        mobileNumber
        domain
        dateTimeCreated
        dateTimeLastActive
        status
        wallet {
          id
          balance
        }
      }
    }
  }
`;

export const GET_MEMBERS_BY_EMAIL_ADDRESS = gql`
  query ($search: String!, $first: Int) {
    membersByEmailAddress(search: $search, first: $first) {
      id
      ... on Member {
        name
        verificationStatus
        emailAddress
        mobileNumber
        domain
        dateTimeCreated
        dateTimeLastActive
        status
        wallet {
          id
          balance
        }
      }
    }
  }
`;

export const GET_MEMBERS_BY_MOBILE_NUMBER = gql`
  query ($search: String!, $first: Int) {
    membersByMobileNumber(search: $search, first: $first) {
      id
      ... on Member {
        name
        verificationStatus
        emailAddress
        mobileNumber
        domain
        dateTimeCreated
        dateTimeLastActive
        status
        wallet {
          id
          balance
        }
      }
    }
  }
`;

export const GET_MEMBERS_BY_NAME = gql`
  query ($search: String!, $first: Int) {
    membersByName(search: $search, first: $first) {
      id
      ... on Member {
        name
        verificationStatus
        emailAddress
        mobileNumber
        domain
        dateTimeCreated
        dateTimeLastActive
        status
        wallet {
          id
          balance
        }
      }
    }
  }
`;
