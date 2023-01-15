import express from "express";
import controller from "../controller/accountController";

const router = express.Router();

router.get("/single/:id", controller.getAccount);
router.get("/all", controller.getAllAccounts);
router.post("/all/add", controller.addAccount);
router.patch("/all/update/:id", controller.updateAccount);
router.delete("/all/delete/:id", controller.deleteAccount);

export default router;
