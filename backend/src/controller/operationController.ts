import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { operationModel } from "../models/operationModel";

const addOperation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const operation = request.body;
  const newOperation = new operationModel({
    _id: new mongoose.Types.ObjectId(),
    ...operation,
  });
  return newOperation
    .save()
    .then((operation) => response.status(201).json(operation))
    .catch((err) => next(err));
};

const getOperation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const operationId = request.params.id;
  return operationModel
    .findById(operationId)
    .populate("account")
    .then((operation: any) => {
      operation
        ? response.status(200).json(operation)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getAllOperations = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return operationModel
    .find()
    .populate("account")
    .then((operations) => {
      operations
        ? response.status(200).json(operations)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getAccOperations = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const account = request.params.id;
  return operationModel
    .find({ account })
    .populate("account")
    .then((operations) => {
      operations
        ? response.status(200).json(operations)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const updateOperation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const operationId = request.params.id;

  return operationModel
    .findById(operationId)
    .then((operation) => {
      if (operation) {
        operation.set(request.body);
        return operation
          .save()
          .then((operation) => response.status(201).json(operation))
          .catch((err) => response.status(500).json(err));
      } else {
        response.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => next(err));
};

const deleteOperation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const operationId = request.params.id;
  return operationModel
    .findByIdAndDelete(operationId)
    .then((operation) =>
      operation
        ? response.status(201).json({ message: "deleted" })
        : response.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

export default {
  getOperation,
  getAllOperations,
  addOperation,
  updateOperation,
  deleteOperation,
  getAccOperations,
};
