import { createPurchaseOrder, getPurchaseOrders } from "@/controllers/purchases";
import express from "express";

const purchaseRouter = express.Router();

purchaseRouter.post("/purchases", createPurchaseOrder);
purchaseRouter.get("/purchases", getPurchaseOrders);


export default purchaseRouter;