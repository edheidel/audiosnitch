/* eslint-disable camelcase */
export interface Token {
  value: string;
  expirationDate: number;
}

export interface AccountResponse {
  access_token: string;
  token_type: "bearer";
  expires_in: 3600;
}

export interface ResultsDiv {
  results_div: HTMLDivElement | null;
}
