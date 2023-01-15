import AccountModel from "./account-model";

export enum OPType {
  WITHDRAW = "withdraw",
  DEPOSIT = "deposit",
  LOAN = "loan",
}

export default interface OperationModel {
  _id: string;
  account: AccountModel;
  type: OPType;
  amount: number;
  created: string;
  interest?: number;
  payments?: number;
}
