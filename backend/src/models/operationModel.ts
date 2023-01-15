import { Document, model, Schema } from "mongoose";

export enum OPType {
  WITHDRAW = "withdraw",
  DEPOSIT = "deposit",
  LOAN = "loan",
}

export interface IOperation {
  account: Schema.Types.ObjectId;
  type: OPType;
  amount: number;
  created: Date;
  interest?: number;
  payments?: number;
}

export interface IOperationModel extends Document, IOperation {}

const operationSchema: Schema = new Schema<IOperation>(
  {
    account: {
      type: Schema.Types.ObjectId,
      required: [true, "missing account"],
      minLength: [2, "account too short"],
      maxLength: [100, "account too long"],
      trim: true,
      ref: "accounts",
    },
    type: {
      type: String,
      required: [true, "missing operation type"],
    },
    amount: {
      type: Number,
      required: [true, "missing amount"],
      min: [0, "amount not valid"],
    },
    created: {
      type: Date,
      required: [true, "missing created date"],
      minLength: [2, "too short"],
      maxLength: [250, "too long"],
    },
    interest: {
      type: Number,
      required: false,
    },
    payments: {
      type: Number,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

export const operationModel = model<IOperationModel>(
  "operations", // name of document collection
  operationSchema
);
