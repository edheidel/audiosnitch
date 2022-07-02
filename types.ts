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

export interface IArtist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface IResultsDiv {
  resultsDiv: HTMLDivElement | null;
}
