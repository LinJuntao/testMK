export interface LoginObj {
  name: string;
  password: string;
  orgID: number;
  orgArrValue: any;
  orgArrLabel: any;
}

export interface OrgObj {
  name: string;
  ID: number;
  code: string;
  shortName: string;
  memo: string;
  createTime: string;
  createUID: string;
  enableState: boolean;
  modifiedTime: string;
  modifiedUID: number | undefined;
  tel: number | undefined;
  address: string;
}
