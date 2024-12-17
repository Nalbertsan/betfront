export type ServersTravelsDTO = {
  travelId: string;
  path: string;
};

export interface TravelRequestDTO {
  serversTravels: ServersTravelsDTO[];
  email: string;
  accentNumber: number;
  origin: string;
  destination: string;
}


export type Ticket = {
  id: string;
  origin: string;
  destination: string;
  accentNumber: number;
};

export type Account = {
  adm: boolean;
  accountAddress: string;
  privateKey: string;
};

export const accounts: Account[] = [
  {
    adm: true,
    accountAddress: "0x56674f87d9F8bFbc22F7F256a8BA813cc1D821D1",
    privateKey: "0xa03cf99a5ad99c123677f256effb1af8daef3cc2b00d50e22da5ed15ceb33a48",
  },
  {
    adm: false,
    accountAddress: "0xD13e5c077024B7eEb8266c5D13B5ab62f1130Be0",
    privateKey: "0xeed98686b793008277fea9820acc350e381bbd015d39303796c0a9a3de75ef9e",
  },
  {
    adm: false,
    accountAddress: "0x5df057eFeccA99cB8D26f90AfFF99449F924Ec03",
    privateKey: "0x70deae725b6909634a89c8d8b26b01b9e79db27f2e6ef4cc7bf7268fc033d76b",
  },
  {
    adm: false,
    accountAddress: "0x73A65f76ad7f12FCc5e7Bb051eCC4F9284c4dCDE",
    privateKey: "0x4f28359ea82d51efcfbd11db35aa0bcd5f8a7831fb7ad2eaa404ca9c4bba757e",
  },
  {
    adm: false,
    accountAddress: "0xB64b6dF1a6E864796ef067fc03368f663290F84C",
    privateKey: "0x5cb6e4308b0cd1da502b3187eab8b3e5b51e075f5e8c0525e0ab1acc82525fdb",
  },
];
