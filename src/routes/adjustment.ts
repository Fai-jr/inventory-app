import { createAdjustment, getAdjustments } from "@/controllers/adjustments";
import express from "express";

const adjustmentRouter = express.Router();

adjustmentRouter.post("/adjustments", createAdjustment);
adjustmentRouter.get("/adjustments", getAdjustments);


export default adjustmentRouter;