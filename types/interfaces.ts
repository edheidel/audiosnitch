/* eslint-disable */
export interface IToken {
  value: string;
  expirationDate: number;
}

export interface IAccountResponse {
  access_token: string;
  token_type: "bearer";
  expires_in: 3600;
}

export interface IResultsDiv {
  resultsDiv: HTMLDivElement | null;
}
