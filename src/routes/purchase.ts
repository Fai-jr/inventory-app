import { createPurchaseOrder, getPurchaseOrders } from "@/controllers/purchases";
import express from "express";

const purchaseRouter = express.Router();

/**
 * @swagger
 * /api/v1/purchases:
 *   post:
 *     summary: Create a new brand
 *     tags: [purchases]
 *     description: Creates a new purchase in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Purchase'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Purchase'
 */

purchaseRouter.post("/purchases", createPurchaseOrder);

/**
 * @swagger
 * /api/v1/purchases:
 *   get:
 *     summary: Retrieve a list of purchases
 *     tags: [purchases]
 *     description: Retrieve a list of purchases from the database.
 *     responses:
 *       200:
 *         description: A list of purchases.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Purchase'
 */

purchaseRouter.get("/purchases", getPurchaseOrders);


export default purchaseRouter;