import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { AccountModel } from "../models/accountModel";

const addAccount = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const account = request.body;
  const newAccount = new AccountModel({
    _id: new mongoose.Types.ObjectId(),
    ...account,
  });
  return newAccount
    .save()
    .then((account) => response.status(201).json(account))
    .catch((err) => next(err));
};

const getAccount = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const accountId = request.params.id;
  return AccountModel.findById(accountId)
    .then((account) =>
      account
        ? response.status(200).json(account)
        : response.status(200).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

const getAllAccounts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return AccountModel.find()
    .then((accounts) =>
      accounts
        ? response.status(200).json(accounts)
        : response.status(200).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

const updateAccount = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const accountId = request.params.id;

  return AccountModel.findById(accountId)
    .then((account) => {
      if (account) {
        account.set(request.body);
        return account
          .save()
          .then((account) => response.status(201).json(account))
          .catch((err) => next(err));
      } else {
        response.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => next(err));
};

const deleteAccount = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const accountId = request.params.id;
  return AccountModel.findByIdAndDelete(accountId)
    .then((account) =>
      account
        ? response.status(201).json({ message: "deleted" })
        : response.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

export default {
  getAccount,
  getAllAccounts,
  addAccount,
  updateAccount,
  deleteAccount,
};
