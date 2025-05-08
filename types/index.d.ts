export interface Member {
  id: number;
  name: string;
  verificationStatus: VerificationStatusType;
  balance?: string;
  emailAddress: string;
  mobileNumber: string;
  domain: string;
  dateTimeCreated: string;
  status: StatusType;
  dateTimeLastActive: string;
  wallet: Wallet;
  [key: string]: any;
}

export type VerificationStatusType = "verified" | "unverified" | "pending";

export type StatusType = "active" | "blacklisted" | "disabled";

export interface Wallet {
  id?: string;
  balance: string;
}

type StringFilterInput = {
  equal?: string;
  notEqual?: string;
  in?: string[];
  notIn?: string[];
  contains?: string;
  startsWith?: string;
};

export type FilterParams = {
  first: number;
  after?: string;
  filter?: {
    name?: StringFilterInput;
    emailAddress?: StringFilterInput;
    mobileNumber?: StringFilterInput;
    domain?: StringFilterInput;
    verificationStatus?: StringFilterInput;
    status?: StringFilterInput;
    dateRegistered?: {
      from: string;
      to: string;
    };
  };
};

export type SearchParams = {
  search: string;
  first: number;
};

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

export type FiltersMap = Record<
  string,
  string | string[] | undefined | { from: string; to: string }
>;

export interface MembersContextType {
  members: Member[];
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  currentAfter?: string;
  setCurrentAfter: (cursor?: string) => void;
  cursorStack: string[];
  setCursorStack: (stack: string[]) => void;
  selectedFilters: FiltersMap;
  setSelectedFilters: React.Dispatch<React.SetStateAction<FiltersMap>>;
  data: any;
  isLoading: boolean;
}

export interface DateFilterOptions {
  [key: string]: string;
  dateTimeCreated: string;
  dateTimeLastActive: string;
}
