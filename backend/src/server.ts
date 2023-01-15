import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import errorModel from "./models/errorModel";
import catchAll from "./middleware/catch-all";
import customerRouter from "./routes/accountRoutes";
import taskRouter from "./routes/operationRoutes";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { config } from "./utils/config";
import init_accounts from "./utils/init_accounts";

mongoose.Promise = global.Promise;

mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("connected");
    // use the function below only for initializing ! -->
    init_accounts();
  })
  .catch((err) => console.log(err));

dotenv.config();
const server = express();

server.use(cors());
server.use(express.json());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

server.use("/api/operations", taskRouter);
server.use("/api/accounts", customerRouter);
server.use("*", (Request: Request, response: Response, next: NextFunction) => {
  next(new errorModel(404, "route not found!"));
});
server.use(catchAll);

server.listen(process.env.PORT, () =>
  console.log("listening on port " + process.env.PORT)
);
