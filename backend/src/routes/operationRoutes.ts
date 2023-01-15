import express from "express";
import controller from "../controller/operationController";

const router = express.Router();

router.get("/single/:id", controller.getOperation);
router.get("/all", controller.getAllOperations);
router.get("/all/account/:id", controller.getAccOperations);
router.post("/all/add", controller.addOperation);
router.patch("/all/update/:id", controller.updateOperation);
router.delete("/all/delete/:id", controller.deleteOperation);

export default router;
