import { Document, model, Schema } from "mongoose";

export interface IAccount {
  number: number;
}

export interface IAccountModel extends Document, IAccount {}

const AccountSchema: Schema = new Schema<IAccount>(
  {
    number: {
      type: Number,
      required: [true, "missing account number"],
      minLength: [2, "number too short"],
      maxLength: [10, "number too long"],
      trim: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

export const AccountModel = model<IAccountModel>(
  "accounts", // name of document collection
  AccountSchema
);
